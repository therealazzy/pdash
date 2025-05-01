import fs from "fs";
import path from "path";

const dataFilePath = path.join(__dirname, `../data/launch-items.json`);


const readLaunchItems = () => {
    if(!fs.existsSync(dataFilePath)){
        return [];
    }
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
}

const writeLaunchItems = (items) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2));
}

export const getLaunchItems = (req, res) => {
    const items = readLaunchItems();
    res.json(items);
}

export const saveConfig = (req, res) => {
    const { id, name, type, path: configPath } = req.body;
    const items = readLaunchItems();

    if (!id || !name || !type || !configPath) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

    const existingItem = items.find(item => item.id === id);

    if(existingItem){
        return res.status(400).json({ error: 'Item already exists' });
    }

    items.push({ id, name, type, path: configPath });
    writeLaunchItems(items);
    res.json({ message: 'Config saved successfully' });
}

export const deleteConfig = (req, res) => {
    const { id } = req.params;
    const items = readLaunchItems();
    const index = items.findIndex(item => item.id === id);

    if(index === -1){
        return res.status(404).json({ error: 'Item not found' });
    }

    items.splice(index, 1);
    writeLaunchItems(items);
    res.json({ message: 'Config deleted successfully' });
}












