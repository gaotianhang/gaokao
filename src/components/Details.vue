<template>
  <div class="details container">
    <h1 class="page-header">
      详细信息
      <el-button
        type="danger"
        style="margin-left: 900px"
        @click="$router.back(-1)"
        >返回</el-button
      >
    </h1>
    <ul class="list-group">
      <li class="list-group-item">
        <span>成绩</span><span>{{ info.tdcj }}</span>
      </li>
      <li class="list-group-item">
        <span>院校名称</span><span>{{ info.yxmc }}</span>
      </li>
      <li class="list-group-item">
        <span>专业名称</span><span>{{ info.zymc }}</span>
      </li>
      <li class="list-group-item">
        <span>批次名称</span><span>{{ info.pcmc }}</span>
      </li>
      <li class="list-group-item">
        <span>是否定向</span><span>{{ info.jhxzmc }}</span>
      </li>
      <li class="list-group-item">
        <span>专业限制</span><span>{{ info.kskmyq }}</span>
      </li>
      <li class="list-group-item">
        <span>学制名称</span><span>{{ info.xzmc }}</span>
      </li>
      <li class="list-group-item">
        <span>学费</span><span>{{ info.sfbz }}</span>
      </li>
      <li class="list-group-item">
        <span>类型</span><span>{{ info.yxlx }}</span>
      </li>
      <li class="list-group-item">
        <span>本科/专科</span><span>{{ info.xlcc }}</span>
      </li>
      <li class="list-group-item">
        <span>is985</span><span>{{ info.is985 }}</span>
      </li>
      <li class="list-group-item">
        <span>is211</span><span>{{ info.is211 }}</span>
      </li>
      <li class="list-group-item">
        <span>双一流</span><span>{{ info.syl }}</span>
      </li>
      <li class="list-group-item">
        <span>民办/公办</span><span>{{ info.bxx }}</span>
      </li>
      <li class="list-group-item">
        <span>院校类型</span><span>{{ info.yxlx }}</span>
      </li>
      <li class="list-group-item">
        <span>离津距离</span><span>{{ info.ljjl }}</span>
      </li>
      <li class="list-group-item">
        <span>学校地址</span><span>{{ info.xxdx }}</span>
      </li>
      <li class="list-group-item">
        <span>邮箱</span><span>{{ info.yx }}</span>
      </li>
      <li class="list-group-item">
        <span>官网</span><span>{{ info.xxzy }}</span>
      </li>
      <li class="list-group-item">
        <span>招生信息网</span><a :href="info.zbzy">{{ info.zbzy }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Details",
  data() {
    return {
      info: [],
    };
  },
  methods: {
    findStudent(id) {
      let that = this;
      let dt = Qs.stringify({ ksh: id });
      this.$axios
        .post("http://localhost:8081/maven_SSM5_war_exploded/details", dt)
        .then(function (response) {
          that.info = response.data[0];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.findStudent(this.$route.params.id);
  },
};
</script>
<style scoped lang='less'>
a {
  text-decoration: none;
}
ul {
  span:first-child {
    display: inline-block;
    width: 200px;
    font-size: 20px;
    font-weight: 700;
  }
}
</style>