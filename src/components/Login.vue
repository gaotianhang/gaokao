<template>
  <div class="login">
    <remote-js src="../static/js/ribbon.js"></remote-js>

    <remote-css href="../static/css/spigPet.css"></remote-css>
    <remote-js src="../static/js/spig.js"></remote-js>

    <header>
      <router-link to="/"
        ><span class="span_01">天津高考志愿报名推荐平台</span>
      </router-link>
      <el-button
        type="text"
        icon="el-icon-service"
        class="btn_01"
        @click="openHTML"
        >联系作者</el-button
      >
      <div id="alertHtml" v-show="isShow">
        <img
          src="/static/img/ewm.jpg"
          alt=""
          style="width: 100px; height: 100px"
        />
        <h6>添加作者微信购买激活码</h6>
      </div>
    </header>
    <form>
      <div class="content">
        <div class="content_input">
          <div class="title">
            <p>登录</p>
          </div>
          <el-tooltip
            class="item"
            effect="dark"
            content="没有激活码？联系作者进行购买"
            placement="bottom-end"
          >
            <el-input
              v-model="UserName"
              clearable
              placeholder="请输入激活码"
            ></el-input>
          </el-tooltip>
          <div class="content_button">
            <el-button type="primary" @click="login">激活</el-button>
          </div>
        </div>
      </div>
    </form>
    <div id="spig" class="spig">
      <div id="message">正在加载中……</div>
      <div id="mumu" class="mumu"></div>
    </div>
  </div>
</template>
<script>
export default {
  //创建component的方式来单页面引入js,css
  components: {
    "remote-css": {
      render(createElement) {
        return createElement("link", {
          attrs: { rel: "stylesheet", href: this.href },
        });
      },
      props: {
        href: { type: String, required: true },
      },
    },
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src },
        });
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },

  name: "Login",
  data() {
    return {
      UserName: "",
      isShow: false,
    };
  },
  methods: {
    // file() {},
    openHTML: function () {
      this.isShow = !this.isShow;
    },
    login() {
      let dt = Qs.stringify({ code: this.UserName });
      this.$axios
        .post("http://localhost:8081/maven_SSM5_war_exploded/login", dt)
        .then(function (response) {
          if (null != response.data && "" != response.data) {
            alert("登录成功");
            window.location.href = "index.html";
          } else {
            alert("登录失败,请输入正确激活码");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped  lang='less'>
//顶部
header {
  position: relative;
  background-color: #333333;
  height: 40px;
  line-height: 40px;
  text-align: right;
  #alertHtml {
    margin-left: 1350px;
    width: 150px;
    text-align: center;
    margin-top: 10px;
  }
  .span_01 {
    position: absolute;
    left: 10px;
    color: white;
  }
  .btn_01 {
    margin-right: 20px;
  }
}
//输入框
.content {
  width: 500px;
  height: 300px;
  box-sizing: border-box;
  padding: 0 50px;
  border-radius: 5px;
  box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: mymove 1s ease-in-out alternate;
  overflow: hidden;
  transition: 1.5s;

  .content_input {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      text-align: center;
      font-size: 24px;
      margin-bottom: 30px;
      font-weight: bold;
      color: #606266;
    }
    .content_button {
      margin-top: 10px;
    }
  }
}
/* div动画效果 */
@keyframes mymove {
  0% {
    width: 0px;
    height: 5px;
  }

  10% {
    width: 50px;
    height: 5px;
  }

  15% {
    width: 100px;
    height: 5px;
  }

  20% {
    width: 150px;
    height: 5px;
  }

  25% {
    width: 200px;
    height: 5px;
  }

  30% {
    width: 250px;
    height: 5px;
  }

  35% {
    width: 300px;
    height: 5px;
  }

  40% {
    width: 350px;
    height: 5px;
  }

  45% {
    width: 450px;
    height: 5px;
  }

  50% {
    width: 500px;
    height: 5px;
  }

  55% {
    height: 30px;
  }

  60% {
    height: 60px;
  }

  65% {
    height: 90px;
  }

  70% {
    height: 120px;
  }

  75% {
    height: 150px;
  }

  80% {
    height: 180px;
  }

  85% {
    height: 210px;
  }

  90% {
    height: 240px;
  }

  95% {
    height: 240px;
  }

  100% {
    height: 300px;
  }
}

.el-input {
  margin-bottom: 25px;
}

.el-button--primary {
  width: 100%;
}
//
</style>
