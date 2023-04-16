// import { os, cpu, mem, drive, netstat } from 'node-os-utils';
import { networkInterfaces } from "os";

export const info = async () => {
    return {};

    // TODO: temporary disable due to some device not able install node-os-utils
    
    /* const interfaces = networkInterfaces();

    const memory = await mem.info();
    const storage = await drive.info();
    const nestats = await netstat.stats();

    return {
        ip: await os.ip(),
        os: await os.oos(),
        cpu: await cpu.usage(),
        uptime: os.uptime(),
        hostname: os.hostname(),
        memory: {
            total: { value: memory.totalMemMb, unit: 'MB' },
            free: { value: memory.freeMemMb, unit: 'MB' },
        },
        storage: {
            total: { value: Number(storage.totalGb), unit: 'GB' },
            free: { value: Number(storage.freeGb), unit: 'GB' },
        },
        network: Object.keys(interfaces).map((ifname: any) => {
            // only take eth and enp interfaces (ethernet)
            if (`${ifname}`.startsWith('eth') || `${ifname}`.startsWith('en')) {
                const net = interfaces[ifname];
                const mac = net.map(n => n.mac).filter((v, index, self) => self.indexOf(v) === index)?.[0];
                const netstat = nestats.find(n => n.interface === ifname);
                return {
                    ifname,
                    input: netstat || { value: netstat.inputBytes, unit: 'bytes' },
                    output: netstat || { value: netstat.outputBytes, unit: 'bytes' },
                    mac,
                    interfaces: net?.filter(n => !n.internal).map((n: any) => {
                        return {
                            address: n.address,
                            netmask: n.netmask,
                            family: n.family,
                            cidr: n.cidr
                        }
                    })
                }
            }
            return null;
        }).filter(v => v !== null)
    } */
}
