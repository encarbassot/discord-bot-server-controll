import axios from "axios";
import fs from "fs/promises"

export async function myIP() {
  const { data } = await axios("https://api.ipify.org/");
  return data;
}

const FILE_PATH = 'storage/ip.txt';

export async function checkIPupdate(){

  const currentIP = await myIP()
  const previousIPfile = await readIPFromFile();
  const hasChanged = previousIPfile.ip !== currentIP 
  if (hasChanged) {
    writeIPToFile(currentIP);
  }

  return {
    hasChanged,
    ip:currentIP,
    timestamp:previousIPfile.timestamp,
    date:formatTimestamp(previousIPfile.timestamp)
  }

}


async function readIPFromFile() {
  try {
    const content = await fs.readFile(FILE_PATH, 'utf-8');
    const [ip,timestamp]=content.split("\n")
    return { ip,timestamp };
  } catch (error) {
    console.error('Error reading file:', error.message);
    return null;
  }
}



function writeIPToFile(ip) {
  try {
    fs.writeFile(FILE_PATH, ip+"\n"+Date.now());
  } catch (error) {
    console.error('Error writing file:', error.message);
  }
}





function formatTimestamp(timestamp) {
  const date = new Date(Number(timestamp));
  // Get components
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear().toString().slice(-2);

  // Construct the formatted string
  const formattedString = `${hours}:${minutes} ${day}/${month}/${year}`;

  return formattedString;
}