export class Logger{
    constructor(){}
    public log(str:string) {
        const time = new Date().toJSON()
        console.log(`${time} - ${str}`)
    }
}