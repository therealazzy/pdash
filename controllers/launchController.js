import express from "express";
import { exec } from "child_process";
import os from "os";

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
