import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  images=[
    { img: "assets/images/1stBottom.jpeg"},
    { img: "assets/images/MTNTop.jpg"},
    { img: "assets/images/Sunsetwater.jpg"},
    { img: "assets/images/[Study_Abroad]Malcolm_Miller.jpg"},
    { img: "assets/images/IMG_4353.jpeg"},
    { img: "assets/images/IMG_0361.JPG"},
    { img: "assets/images/IMG_9783.jpeg"},
    { img: "assets/images/mendoza.jpg"},
    { img: "assets/images/daytripValencia.jpg"},
  ];
  slideConfig={
    "slideToShow": 3,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": true,
    "autoplay": true,
  };

  scrollToInfo() {
    document.getElementById("scroll").scrollIntoView({behavior:"smooth"});
  }
/*
  imageObject: Array<object> = [{
    image: 'https://engineering.virginia.edu/sites/default/files/styles/media-large/public/1stBottom.jpeg?itok=M6sgH5jF',
    title: "Hiking Roy's Peak",
    thumbImage: 'https://engineering.virginia.edu/sites/default/files/styles/media-large/public/1stBottom.jpeg?itok=M6sgH5jF',
  },
  {
    image: 'https://lh3.googleusercontent.com/zD08aI5d9uUfRX-MDLI6hlSXoZBEDNY1kFo8c3If_1emkeEP-IqZuOcA-5hDd1GTsqblhof5ucDmx1oO7k7fRsQ9_Ko-z3kmibESzVG9_q2YyzmHWOj7cAYUzeNd9VKlHgPWqJ5T',
    title: 'Biking in Tel Aviv',
    thumbImage: 'https://lh3.googleusercontent.com/zD08aI5d9uUfRX-MDLI6hlSXoZBEDNY1kFo8c3If_1emkeEP-IqZuOcA-5hDd1GTsqblhof5ucDmx1oO7k7fRsQ9_Ko-z3kmibESzVG9_q2YyzmHWOj7cAYUzeNd9VKlHgPWqJ5T',

  },
  {
    image: 'https://engineering.virginia.edu/sites/default/files/styles/media-large/public/Sunsetwater.jpg?itok=jy2AEOuc',
    title: "Swimming in Waiheke",
    thumbImage: 'https://engineering.virginia.edu/sites/default/files/styles/media-large/public/Sunsetwater.jpg?itok=jy2AEOuc',
  },
  {
    image: 'https://lh5.googleusercontent.com/ZBCTbVydeXGGIgbepZAZgfspTsmoqIpvca8v9LlOfC7a4bxJfsRdCyDkvFcV_CQkeJyW6hs-2ECJVSzKAeLkN69H9uVQv0wad85KaVJFgzFkc2elEPKENKnQrQN89R_nlISDzYLi',
    title: "Athens, Greece",
    thumbImage: 'https://lh5.googleusercontent.com/ZBCTbVydeXGGIgbepZAZgfspTsmoqIpvca8v9LlOfC7a4bxJfsRdCyDkvFcV_CQkeJyW6hs-2ECJVSzKAeLkN69H9uVQv0wad85KaVJFgzFkc2elEPKENKnQrQN89R_nlISDzYLi',
  },
  {
    image: 'https://engineering.virginia.edu/sites/default/files/styles/media-large/public/MTNTop.jpg?itok=iVLnYOiQ',
    title: "Hiking Roy's Peak in Wanaka, New Zealand",
    thumbImage: 'https://engineering.virginia.edu/sites/default/files/styles/media-large/public/MTNTop.jpg?itok=iVLnYOiQ',

  },
  {
    image: 'https://lh4.googleusercontent.com/W-nQeenu5GJ32Nc_PEQpakKuf9cDXJ1NEv9hxVwcZqgonBJyu2HXB9R_NTFgXjEkTqDIXfv1ss-LOfIjtrbGto2LATfhDnU8DJnHllmUYTMs-njfyTFPBQifxwYeCgIJB0B0Idmr',
    title: "Ziplining in Argentina",
    thumbImage: "https://lh4.googleusercontent.com/W-nQeenu5GJ32Nc_PEQpakKuf9cDXJ1NEv9hxVwcZqgonBJyu2HXB9R_NTFgXjEkTqDIXfv1ss-LOfIjtrbGto2LATfhDnU8DJnHllmUYTMs-njfyTFPBQifxwYeCgIJB0B0Idmr",
  },
  {
    image: 'https://engineering.virginia.edu/sites/default/files/common/offices/international-programs-office/daytripValencia.jpg',
    title: "Fall Semester in Valencia",
    thumbImage: 'https://engineering.virginia.edu/sites/default/files/common/offices/international-programs-office/daytripValencia.jpg',
  },
  {
    image: 'https://lh3.googleusercontent.com/s975a_6Pltt4NjZr4BOOLe-stlfLvxIjhlOJMUfz3RTb9kRlvGjdfih0lHGD1zXtbWcoerZnjx0QvydQ-jZDX_kyp0Nfipp66Ap7In4e89PiggU8WYCOEtIA2iUnmiAye1OIa0Ci',
    title: "Touring the Colosseum in Rome",
    thumbImage:'https://lh3.googleusercontent.com/s975a_6Pltt4NjZr4BOOLe-stlfLvxIjhlOJMUfz3RTb9kRlvGjdfih0lHGD1zXtbWcoerZnjx0QvydQ-jZDX_kyp0Nfipp66Ap7In4e89PiggU8WYCOEtIA2iUnmiAye1OIa0Ci',
  },
  {
    image: 'https://lh6.googleusercontent.com/xuYrqB6AXT928Nvt5WTclodWICpiN9hOzau4R26iFEjqSvPF1KcNsngMbjsJVZ5biuFw9u-L7ONk8GaHiKAg5Gf79LtHPCa0LaS1HMB3x7UcEwcSBkCDrx4nLCwNGplmllYYiTIX',
    title: "Fall Semester in Shanghai",
    thumbImage: 'https://lh6.googleusercontent.com/xuYrqB6AXT928Nvt5WTclodWICpiN9hOzau4R26iFEjqSvPF1KcNsngMbjsJVZ5biuFw9u-L7ONk8GaHiKAg5Gf79LtHPCa0LaS1HMB3x7UcEwcSBkCDrx4nLCwNGplmllYYiTIX',
  },
  {
    image: 'https://lh5.googleusercontent.com/T0Xkx8V_Z0Od8MMcMI8Z66VrPpMzmV2tAyw92616xIPTqco-4iox9EVEKFEvu7O2_S4QgrQzEq56ZoOLMXDfw1TS5PHyDuDH_WN45w02vfakkqX5TlBclVeuzrbe1iefr1JpwToU',
    title: "Fall Semester in Glasgow",
    thumbImage: 'https://lh5.googleusercontent.com/T0Xkx8V_Z0Od8MMcMI8Z66VrPpMzmV2tAyw92616xIPTqco-4iox9EVEKFEvu7O2_S4QgrQzEq56ZoOLMXDfw1TS5PHyDuDH_WN45w02vfakkqX5TlBclVeuzrbe1iefr1JpwToU',
  },
  {
    image: 'https://lh3.googleusercontent.com/iCprUPWfET9HtpwZWjms1GX2z8tf1XQ3oVY79buun1VwryZDPzY6crHBawmfnyQYICj0GigLFsVRBv01yLUrV6nQChjyi6fG2Byr-oqCDcrUO_gQdDwBAnyHftfZ1SqXMofMo79X',
    title: "Year in Edinburgh",
    thumbImage: 'https://lh3.googleusercontent.com/iCprUPWfET9HtpwZWjms1GX2z8tf1XQ3oVY79buun1VwryZDPzY6crHBawmfnyQYICj0GigLFsVRBv01yLUrV6nQChjyi6fG2Byr-oqCDcrUO_gQdDwBAnyHftfZ1SqXMofMo79X',
  },
  {
    image: 'https://lh4.googleusercontent.com/Dd_v5z_dsfHjlplx4Pup3bWLh3AqdnkGAwdvxOe_8OK-sEuYIdKCu-ycBlYiFrt-h8HgoLtJYAd0NVPFMf7_MdVn-9gEDu2uUgQcYWXmeUfXf2MasLPN0hPFTmSBLHrHWCFW0pPT',
    title: "Fall Semester in Singapore",
    thumbImage: 'https://lh4.googleusercontent.com/Dd_v5z_dsfHjlplx4Pup3bWLh3AqdnkGAwdvxOe_8OK-sEuYIdKCu-ycBlYiFrt-h8HgoLtJYAd0NVPFMf7_MdVn-9gEDu2uUgQcYWXmeUfXf2MasLPN0hPFTmSBLHrHWCFW0pPT',
  },
  {
    image: 'https://lh6.googleusercontent.com/et7r6dtm9-8zmXGScw4nfBknSlR1byGbhhysZZ7PqQvj4JLmeH__1sPzL2o70hzn7rFL6bezpa6J8sAbbBXCscWjDaVudvf4vHTL2uGSpaisXtf3hU88xu-AHq0HIGylK8U1H46i',
    title: "Summer in Guatemala",
    thumbImage: 'https://lh6.googleusercontent.com/et7r6dtm9-8zmXGScw4nfBknSlR1byGbhhysZZ7PqQvj4JLmeH__1sPzL2o70hzn7rFL6bezpa6J8sAbbBXCscWjDaVudvf4vHTL2uGSpaisXtf3hU88xu-AHq0HIGylK8U1H46i',
  },
  {
    image:'https://lh3.googleusercontent.com/HNhDz0YIzQ-aGLNcMTE12YsO4wZJT3Mfx0A2SMpl3j1a9sGfVGU85uC24GCYs6ZiSb3xs-J2p1h16Kr-2wp4_53MUEhQ5PpwzTW8zsPaMs9sziWL4vx_ounAia9uJ2yg5zznYMgV',
    title: "Summer in Scandinavia",
    thumbImage: 'https://lh3.googleusercontent.com/HNhDz0YIzQ-aGLNcMTE12YsO4wZJT3Mfx0A2SMpl3j1a9sGfVGU85uC24GCYs6ZiSb3xs-J2p1h16Kr-2wp4_53MUEhQ5PpwzTW8zsPaMs9sziWL4vx_ounAia9uJ2yg5zznYMgV',
  },
  {
    image:'https://lh3.googleusercontent.com/tSvx2P7Lwao6wDJdoKy-XY2aDhUYr0y8WaJmD472yzACpjtVR84PrL_-9D5CbL4S_Ap0gsY4_DNRZQRIgNX2rX_BgwJppB6PTYpZbXNIjfqzGiCUcLWXvFbCciJ0OXm_t1BMvlUM',
    title: "January Term in Paris",
    thumbImage:'https://lh3.googleusercontent.com/tSvx2P7Lwao6wDJdoKy-XY2aDhUYr0y8WaJmD472yzACpjtVR84PrL_-9D5CbL4S_Ap0gsY4_DNRZQRIgNX2rX_BgwJppB6PTYpZbXNIjfqzGiCUcLWXvFbCciJ0OXm_t1BMvlUM',
  },

  
  ];
*/
  constructor() { }

  ngOnInit(): void {
  }


}
