const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const https = require('https');

function activate(context) {
    console.log('Sovereign Cloud Extension is active.');

    let compileDisposable = vscode.commands.registerCommand('sovereign.compileFile', async (uri) => {
        let filePath = uri ? uri.fsPath : (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.fileName);
        if (!filePath) {
            vscode.window.showErrorMessage('No active file selected for compilation.');
            return;
        }

        const config = vscode.workspace.getConfiguration('sovereign');
        const apiKey = config.get('apiKey');
        const apiUrl = config.get('apiUrl') || 'https://a3pme2hx4v.us-east-1.awsapprunner.com';
        const optimization = config.get('optimizationLevel') || 'O3';

        if (!apiKey) {
            const enteredKey = await vscode.window.showInputBox({
                prompt: 'Enter your Sovereign Cloud / AWS Marketplace API Key',
                password: true
            });
            if (!enteredKey) return;
            await config.update('apiKey', enteredKey, vscode.ConfigurationTarget.Global);
        }

        const ext = path.extname(filePath).toLowerCase();
        let lang = 'cpp';
        if (ext === '.go') lang = 'go';
        else if (ext === '.rs') lang = 'rust';
        else if (ext === '.c') lang = 'c';
        else if (ext === '.zig') lang = 'zig';
        else if (ext === '.py') lang = 'python';
        else if (ext === '.ts') lang = 'typescript';
        else if (ext === '.js') lang = 'javascript';

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Sovereign Cloud: Compiling ${path.basename(filePath)} (${lang.toUpperCase()})...`,
            cancellable: false
        }, async () => {
            try {
                const fileBytes = fs.readFileSync(filePath);
                const boundary = '----SovereignVSCode' + Math.random().toString(36).substring(2);
                
                let body = [];
                body.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="api_key"\r\n\r\n${config.get('apiKey') || apiKey}\r\n`));
                body.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="language"\r\n\r\n${lang}\r\n`));
                body.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="optimization_level"\r\n\r\n${optimization}\r\n`));
                body.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${path.basename(filePath)}"\r\nContent-Type: application/octet-stream\r\n\r\n`));
                body.push(fileBytes);
                body.push(Buffer.from(`\r\n--${boundary}--\r\n`));

                const totalPayload = Buffer.concat(body);
                const parsedUrl = new URL(apiUrl + '/v1/compile');

                const reqOptions = {
                    method: 'POST',
                    hostname: parsedUrl.hostname,
                    port: parsedUrl.port || 443,
                    path: parsedUrl.pathname,
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${boundary}`,
                        'Content-Length': totalPayload.length
                    }
                };

                const resData = await new Promise((resolve, reject) => {
                    const req = https.request(reqOptions, (res) => {
                        let raw = '';
                        res.on('data', chunk => raw += chunk);
                        res.on('end', () => {
                            try { resolve(JSON.parse(raw)); } catch(e) { resolve(raw); }
                        });
                    });
                    req.on('error', reject);
                    req.write(totalPayload);
                    req.end();
                });

                if (resData.status === 'success') {
                    const outBinName = path.parse(filePath).name + (process.platform === 'win32' ? '.exe' : '');
                    const outPath = path.join(path.dirname(filePath), outBinName);
                    
                    const downloadUrl = apiUrl + resData.download_url;
                    await new Promise((resolve, reject) => {
                        https.get(downloadUrl, (res) => {
                            const fileStream = fs.createWriteStream(outPath);
                            res.pipe(fileStream);
                            fileStream.on('finish', () => {
                                fileStream.close();
                                try { fs.chmodSync(outPath, 0o755); } catch(e) {}
                                resolve();
                            });
                        }).on('error', reject);
                    });

                    vscode.window.showInformationMessage(`⚡ Compiled ${lang.toUpperCase()} in ${resData.duration_ms}ms! Saved to ${outBinName}`);
                } else {
                    vscode.window.showErrorMessage(`Compilation Error: ${resData.message || JSON.stringify(resData)}`);
                }
            } catch (err) {
                vscode.window.showErrorMessage(`Sovereign Cloud Error: ${err.message}`);
            }
        });
    });

    context.subscriptions.push(compileDisposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
