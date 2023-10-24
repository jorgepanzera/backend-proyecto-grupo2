function generateUUID(): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let uuid = '';
  
    for (let i = 0; i < 16; i++) {
      const rnd = Math.floor(Math.random() * chars.length);
      uuid += chars.charAt(rnd);
    }
  
    return uuid;
  }
  
  export { generateUUID };
  