export class Video{
    videoId: number;
    title: string;
    description : string;
    videoSrc: string
    seconds: number;
    timeAsString : string

    constructor(videoId : number, title : string, description : string, videoSrc : string, seconds: number ) {
        this.videoId = videoId;
        this.title = title;
        this.description = description;
        this.videoSrc = videoSrc
        this.seconds = seconds
        this.timeAsString = this.timeDisplay()
      }

      timeDisplay() : string
      {
            var h = Math.floor(this.seconds / 3600);
            var m = Math.floor(this.seconds % 3600 / 60);
            var s = Math.floor(this.seconds % 3600 % 60);
        
            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            return hDisplay + mDisplay + sDisplay; 
      }


}