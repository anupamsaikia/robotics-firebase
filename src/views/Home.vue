<template>
<div class="main">

  <v-layout class="pa-2 ">
    <div width="50"><img src="../assets/club-logo.png" alt="Logo" height="80"></div>
    <v-spacer></v-spacer>
    <div width="50"><img src="../assets/cit-logo.png" alt="Logo" height="80"></div>
  </v-layout>

  <v-carousel
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
  </v-carousel>



  <div class="container">
    <div class="text"></div>
  </div>


  






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
@import 'https://fonts.googleapis.com/css?family=Roboto+Mono:400';

.container {
  position: relative;
  top: -350px;
  font-family: 'Roboto Mono', monospace;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.text { 
  font-weight: 400;
  font-size: 28px;
  color: #ffffff;
  text-shadow: 3px 3px 8px rgb(0, 0, 0);
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


