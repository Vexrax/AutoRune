export class champRuneStore
{
    private storedData: JSON;
    private dataLocationOnDisk: string;

    constructor(dataLocationPath: string)
    {
        this.dataLocationOnDisk = dataLocationPath;
        this.loadStoredData();
    }

    public loadStoredData()
    {
        //todo
    }

    public async getChampRunes(champkey: string): Promise<string>
    {
        //todo
        return await "todo";
    }


}