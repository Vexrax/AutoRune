import {LcuHelper} from "./lcu_helper";

type ChampSelectState = 'Selected' | 'Not-Selected';

export class ChampSelectHandler
{
    private lcu: LcuHelper | null;
    private champSelectState: ChampSelectState;

    constructor(lcuConnection: LcuHelper)
    {
        this.lcu = lcuConnection;
        this.champSelectState = 'Not-Selected';

    }

    public champselectListener(payload: any)
    {
        //logic for checking if your champ is locked in.%
        if(payload.uri === '/lol-champ-select-legacy/v1/session' && payload.data != null)
        {
            console.log(payload.data["actions"][0][0]["completed"]);
            if(payload.data["actions"][0][0]["completed"] && this.champSelectState == 'Not-Selected')
            {
                this.onChampLockIn();
            }
        }
    }

    public async onChampLockIn()
    {
        if (this.lcu != null)
        {
            //We do this to ensure the JSON is parsed correctly
            var tempcount = JSON.stringify(await this.lcu.getRunePageCount());
            var templist = JSON.stringify(await this.lcu.getRunePageList());

            var runepagecountdata = JSON.parse(tempcount);
            var allrunepagedata = JSON.parse(templist);

            //offset of 5 for preset runes
            if (allrunepagedata.length-5 == parseInt(runepagecountdata["ownedPageCount"]))
            {
                this.lcu.deleteRunePage(allrunepagedata[allrunepagedata.length-6]["id"]);
            }
            //todo function for getting runes based on champion
            const runes = [
                8021,
                9111,
                9104,
                8014,
                8139,
                8135
            ];

            this.lcu.setRunePage(runes, 8000, 8100);
            this.champSelectState = 'Selected';
        }
    }
    public async getRuneData(championName: string)
    {
        console.log(championName);
        //todo propper implimentation
    }

}