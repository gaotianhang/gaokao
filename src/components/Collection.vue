<template>
  <div class="collection">
    <header>
      <span class="span_01">天津高考志愿报名推荐平台</span>
      <router-link to="/Index">
        <el-button type="text" icon="el-icon-refresh-right" class="btn_01"
          >返回</el-button
        >
      </router-link>
    </header>
    <div style="margin-top: 20px">
      <el-table
        :data="
          table.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
        height="530"
        :default-sort="{ prop: 'tdcj', order: 'descending' }"
        border
        stripe
      >
        <!-- 2020qjlq1 -->
        <el-table-column fixed prop="tdcj" label="成绩" width="80" sortable>
        </el-table-column>
        <el-table-column prop="yxmc" label="院校名称" width="180">
        </el-table-column>
        <el-table-column prop="zymc" label="专业名称" width="200">
        </el-table-column>
        <!-- 2020jh -->
        <el-table-column prop="pcmc" label="批次名称" width="200">
        </el-table-column>
        <el-table-column prop="jhxzmc" label="是否定向" width="180">
        </el-table-column>
        <el-table-column prop="kskmyq" label="专业限制" width="180">
        </el-table-column>
        <!-- yxinfo -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="details(scope.row.ksh)"
              size="small"
              >详情</el-button
            >
            <el-button
              @click="deleteRow(scope.row.ksh)"
              type="danger"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination" style="float: right">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes,prev, pager, next,jumper"
          :total="table.length"
          prev-text="上一页"
          next-text="下一页"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Collection",
  computed: {
    table() {
      return this.$store.state.collData;
    },
  },
  data() {
    return {
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数
      string: "", //接收的session
      arr: [], //分割后的ksh
      info: [], //接收的全部数据
    };
  },
  methods: {
    //每页下拉显示数据
    handleSizeChange: function (size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
    },
    //点击第几页
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
    },
    //移除单行数据
    deleteRow(val) {
      this.arr.forEach(function (value, index, arr) {
        if (value == val) {
          arr.splice(index, 1);
        }
      });
      this.info = [];
      this.findAllStudent(this.arr);
      if (this.arr.length > 0) {
        window.sessionStorage.setItem("collection", this.arr);
      } else {
        window.sessionStorage.clear("collection");
      }
    },
    //查询所有收藏数据并给vuex
    findAllStudent(val) {
      let that = this;
      val.forEach((element) => {
        let dt = Qs.stringify({ ksh: element });
        this.$axios
          .post("http://localhost:8081/maven_SSM5_war_exploded/details", dt)
          .then(function (response) {
            that.info.push(response.data[0]);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
      that.$store.commit("addColl", this.info);
    },
    //跳转详情页
    details(id) {
      this.$router.push({
        path: `/Details/${id}`,
      });
    },
  },
  created() {
    this.string = window.sessionStorage.getItem("collection");
    console.log(this.string);
    if (this.string != null) {
      this.arr = this.string.split(",");
      this.findAllStudent(this.arr);
    }
  },
};
</script>
<style scoped lang="less">
header {
  position: relative;
  background-color: #333333;
  height: 40px;
  line-height: 40px;
  text-align: right;
  .span_01 {
    cursor: pointer;
    position: absolute;
    left: 10px;
    color: white;
  }

  .btn_01 {
    margin-right: 20px;
  }
}

/* 头部标题结束 */
</style>
