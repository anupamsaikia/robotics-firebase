<template>
<div class="main">

  <!-- <v-layout class="pa-2 ">
    <div width="50"><img src="../assets/club-logo.png" alt="Logo" height="80"></div>
    <v-spacer></v-spacer>
    <div width="50"><img src="../assets/cit-logo.png" alt="Logo" height="80"></div>
  </v-layout> -->

  <!-- <v-carousel
    hide-delimiters
    hide-controls
  >
    <v-carousel-item
      v-for="(item,i) in images"
      :key="i"
      :src="item.src"
      reverse-transition="fade"
      transition="fade"
    ></v-carousel-item>
  </v-carousel> -->

  <v-layout row >
    <v-flex xs12 sm10 offset-sm1>
      <v-parallax
        dark
        src="https://firebasestorage.googleapis.com/v0/b/robotics-club-cit.appspot.com/o/banners%2Fbanner.jpg?alt=media&token=9c4dbff5-ceea-42df-842a-99558fcda070"
      >
        <v-layout
          align-center
          column
          justify-center
        >
          <div class="container display-2 font-weight-thin">
            <div class="text"></div>
          </div>
        </v-layout>
      </v-parallax>
    </v-flex>
  </v-layout>

  <v-layout row class="my-3">
    <v-flex xs12 sm10 offset-sm1>
      <v-card color="transparent" flat>
        <v-card-title class="headline px-5">
          About Us
        </v-card-title>
        <v-card-text style="text-align: justify; text-justify: inter-word;">
          Since the first appearance of a robot in a movie in 1927, robots have intrigued us through innumerable appearance in fictional stories in the media, be it the print or the film or a fully functional robot, like Sophia. Robotics is the branch of technology that deals with the design, construction, operation, structure disposition, manufacture and their application. The Robotics club of CIT Kokrajhar since its inception in August 2016 by three students from the department of ECE, working in their labs to build their robots. It has now come a long way of its development after its official lunch in 15th August 2017, the club in now managed by core team members under the guidance of highly dedicated faculty in-charges and has more than 100 student members from all departments working together in a dedicated workspace provided by the Institute.
        </v-card-text>
        <v-card-text style="text-align: justify; text-justify: inter-word;">
          The club has always tried its best to stimulate interest in robotics among the students of the Institute. With the enthusiasm of its member and the support of the Institute, the club aims to reach each and every student of the institute and flourish into a fully functional lab with the proper infrastructure in the years to come, where the students can harness their creativity and improve their soft skills too. 
        </v-card-text>
        <v-card-text style="text-align: justify; text-justify: inter-word;">
          Club has recently started its “RENDEZVOUS” series which aims to frequently organize some interaction sessions with the faculties and industry experts. This will certainly help students to learn a lot from the knowledge and experience of the professors and experts, which can enlighten the student and help them select a right path to build a successful career. The Club also plans to have industrial tie-ups to help students get more thorough and practical knowledge and get industrial projects that will help students to apply their knowledge. Work on many good projects like under water surveillance system, drone technology, facial recognition etc. has already being started in the club at a preliminary level and we look forward to bringing them to life.
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>


  <v-layout row class="my-3">
    <v-flex xs12 sm10 offset-sm1>
      <v-parallax
        dark
        src="https://firebasestorage.googleapis.com/v0/b/robotics-club-cit.appspot.com/o/banners%2Fnewbg.jpg?alt=media&token=52d332a1-13bc-4bc8-9cf8-8588bf8658fe"
      >
        <v-layout
          align-center
          column
          justify-center
        >
          <!-- Desktop -->
          <v-layout class="mt-5 pt-4" v-if="$vuetify.breakpoint.mdAndUp">
            <v-flex class="mx-4">
              <v-btn style="border:solid 6px #ffffff; width:160px;height:160px" round large outline href="https://facebook.com/themoderngeeks" target="_blank">
                <img src="../assets/f.png" alt="facebook" width="140" height="140">
              </v-btn>
            </v-flex>
            <v-flex class="mx-4">
              <v-btn style="border:solid 6px #ffffff; width:160px;height:160px" round large outline href="https://youtube.com/channel/UCo7ZitSCcgWNEsQVVzBx41g" target="_blank">
                <img src="../assets/y.png" alt="youtube" width="140" height="140">
              </v-btn>
            </v-flex>
            <v-flex class="mx-4">
              <v-btn style="border:solid 6px #ffffff; width:160px;height:160px" round large outline href="mailto:roboticscitk@gmail.com" target="_blank">
                <img src="../assets/m.png" alt="email" width="140" height="140">
              </v-btn>
            </v-flex>
          </v-layout>
          <!-- Mobile -->
          <v-layout class="mt-5 pt-4" v-if="$vuetify.breakpoint.smAndDown">
            <v-flex>
              <v-btn style="border:solid 4px #ffffff; width:110px;height:110px;" round large outline href="https://facebook.com/themoderngeeks">
                <img src="../assets/f.png" height="90px" width="90">
              </v-btn>
            </v-flex>
            <v-flex>
              <v-btn style="border:solid 4px #ffffff; width:110px;height:110px" round large outline href="https://youtube.com/channel/UCo7ZitSCcgWNEsQVVzBx41g">
                <img src="../assets/y.png" height="90px" width="90">
              </v-btn>
            </v-flex>
            <v-flex>
              <v-btn style="border:solid 4px #ffffff; width:110px;height:110px" round large outline href="mailto:roboticscitk@email.com">
                <img src="../assets/m.png" height="90px" width="90">
              </v-btn>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex>
              <v-btn style="border:solid 4px #ffffff; width:300px;height:120px" round large outline to="join">
                <span class="white--text" style="font-weight:800;font-size:40px;">Join Us</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-parallax>
    </v-flex>
  </v-layout>





  


  






</div>
</template>

<script>
export default {
  mounted(){
    var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

    var TextScramble = function () {
      function TextScramble(el) {_classCallCheck(this, TextScramble);
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
      }_createClass(TextScramble, [{ key: 'setText', value: function setText(
        newText) {var _this = this;
          var oldText = this.el.innerText;
          var length = Math.max(oldText.length, newText.length);
          var promise = new Promise(function (resolve) {return _this.resolve = resolve;});
          this.queue = [];
          for (var i = 0; i < length; i++) {
            var from = oldText[i] || '';
            var to = newText[i] || '';
            var start = Math.floor(Math.random() * 40);
            var end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from: from, to: to, start: start, end: end });
          }
          cancelAnimationFrame(this.frameRequest);
          this.frame = 0;
          this.update();
          return promise;
        } }, { key: 'update', value: function update()
        {
          var output = '';
          var complete = 0;
          for (var i = 0, n = this.queue.length; i < n; i++) {var _queue$i =
            this.queue[i],from = _queue$i.from,to = _queue$i.to,start = _queue$i.start,end = _queue$i.end,char = _queue$i.char;
            if (this.frame >= end) {
              complete++;
              output += to;
            } else if (this.frame >= start) {
              if (!char || Math.random() < 0.28) {
                char = this.randomChar();
                this.queue[i].char = char;
              }
              output += '<span class="dud">' + char + '</span>';
            } else {
              output += from;
            }
          }
          this.el.innerHTML = output;
          if (complete === this.queue.length) {
            this.resolve();
          } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
          }
        } }, { key: 'randomChar', value: function randomChar()
        {
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        } }]);return TextScramble;}();

    var phrases = [
    'Welcome to Robotics Club CIT Kokrajhar',
    'Do you want to build your own robot?',
    'Start from the basic & explore beyond your imagination'
    ];


    var el = document.querySelector('.text');
    var fx = new TextScramble(el);

    var counter = 0;
    var next = function next() {
      fx.setText(phrases[counter]).then(function () {
        setTimeout(next, 2000);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();

  },
  

  data(){
    return {
      images: [
        {
          src: 'http://singtel.co.jp/wp/wp-content/uploads/20180202.jpg'
        },
        {
          src: 'https://fos.cmb.ac.lk/esl/wp-content/uploads/2013/05/DSC_1145.jpg'
        },
        {
          src: 'http://www.osckilabs.com/assets/envision/arduino.jpg'
        },
        {
          src: 'https://i.imgur.com/tnKlDYQ.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  top: 150px;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.text {
  font-weight: 200;
  text-align: center;
  color: #ffffff;
  text-shadow: 3px 3px 2px rgb(0, 0, 0);
}
.dud {
  color: #757575;
}

.fade-enter-active,
.fade-leave-active,
.fade-leave-to {
	transition: 0.3s ease-out;
	position: absolute;
	top: 0;
	left: 0;
}

.fade-enter,
.fade-leave,
.fade-leave-to {
	opacity: 0;
}


</style>


