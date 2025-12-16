
class Cache{
    users = new Map<string, any>();
    tours = new Map<string, any>();
    bookings = new Map<string, any>();
}

const cache = new Cache();
export default cache;