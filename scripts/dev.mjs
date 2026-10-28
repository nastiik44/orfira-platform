import {spawn} from 'node:child_process';
const children=[spawn(process.execPath,['server/index.mjs'],{stdio:'inherit'}),spawn('npm',['run','dev'],{stdio:'inherit'})];
const stop=()=>{for(const child of children)child.kill();process.exit(0)};
process.on('SIGINT',stop);process.on('SIGTERM',stop);
