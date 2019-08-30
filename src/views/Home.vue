<template>
<div class="main">


  <v-layout row class="my-3">
    <v-flex xs12 sm10 offset-sm1>
      <v-card color="transparent" flat>
        <v-card-title class="headline px-5">
          We have updated our website. You are seeing this old page because, the old cache and site data are still stored in your browser.
        </v-card-title>
        
        <v-card-text class="headline px-5">
          Please delete your browser site data and cache to access the new site.
	  <br>
	  If it doesnot work after that then try this methods:
	  <br>
	  In Google Chrome, you can go to Developer tools (F12) -> Application -> Clear storage and click Clear site data
	  <img src="https://i.stack.imgur.com/IueOe.png">
	  
	  <br>
	  <br>
	  
	  
        </v-card-text>
      </v-card>
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


