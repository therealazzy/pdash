import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { exec } from "child_process";
import os from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, '../data/launch-items.json');

export const launchProgram = (req, res) => {
    const { program } = req.body;
    const platform = os.platform();
    let command;
    if(platform === "darwin"){
        command = `open ${program}`;
    } else if (platform === "win32"){
        command = `start ${program}`;
    } else if (platform === "linux"){
        command = `xdg-open ${program}`;
    } else {
        return res.status(400).json({
            error: "Unsupported platform"
        });
    }
    
    exec(command, (err) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to launch program"
            });
        }
        res.json({ message: `$Program launched successfully` });
            
    })
}

export const launchFolder = (req, res) => {
    const { path } = req.body;
    const platform = os.platform();
    let command;

    if(platform === "darwin"){
        command = `open ${path}`;
    } else if (platform === "win32"){
        command = `start ${path}`;
    } else if (platform === "linux"){
        command = `xdg-open ${path}`;
    } else {
        return res.status(500).json({
            error: "Unsupported platform"
        });
    }

    exec(command, (err) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to launch folder"
            });
        }
        res.json({ message: `$Folder launched successfully` });
    })

}

export const launchById = (req, res) => {
    const { id } = req.params;

    if(!fs.existsSync(dataFilePath)){
        return res.status(404).json({ error: 'Config file not found' });
    }

    const items = JSON.parse(fs.readFileSync(dataFilePath));
    const item = items.find(item => item.id === id);

    if(!item){
        return res.status(404).json({ error: `Item ${item.id} not found` });
    }

    const platform = os.platform();
    let command;

    if(platform === "darwin"){
        command = `open ${item.path}`;
    } else if (platform === "win32"){
        command = `start ${item.path}`;
    } else if (platform === "linux"){
        command = `xdg-open ${item.path}`;
    } else {
        return res.status(500).json({
            error: "Unsupported platform"
        });
    }
    
    exec(command, (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to launch item" });
        }
        res.json({ message: `${item.name} launched successfully` });
    });
}