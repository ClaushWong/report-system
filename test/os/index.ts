import * as os from '@src/lib/os';

os.info().then(info => {

    info.network?.forEach(n => console.log(n));

}).catch(err => console.error(err));