import fs from 'fs';

interface Room {
    id: number;
    name: string;
    photo: string;
    room_type: string;
    room_number: number;
    description: string;
    offer: number;
    price: number;
    cancellation: string;
    amenities: string[];
    discount: number;
    status: string;
}

const readAllRoomsData = (): Room[] => {
    const rawData = fs.readFileSync('rooms.json', 'utf-8');
    return JSON.parse(rawData);
}

const orderRoomsByPriceLowToHigh = (): Room[] => {
    const rooms: Room[] = readAllRoomsData();
    const orderedRooms = rooms.sort((room1, room2) => {
        if(room1.price > room2.price){
            return 1;
        } else if (room1.price < room2.price){
            return -1;
        }
        return 0;
    })
    return orderedRooms;
}

const createCsv = (): void => {
    const rooms = orderRoomsByPriceLowToHigh();

    const csvHeader: string = Object.keys(rooms[0]).join(';');

    const csvData: string[] = rooms.map((room: Room) => {
        return Object.values(room).map(value => Array.isArray(value) ? `"${value.join(',')}"` : `"${value}"`).join(';');
    });

    const csvContent: string = [csvHeader, ...csvData].join('\n');

    fs.writeFileSync('rooms.csv', csvContent);
    console.log('Archivo rooms.csv creado correctamente.');
}

createCsv();