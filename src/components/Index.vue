<template>
  <div class="index">
    <header>
      <router-link to="/"
        ><span class="span_01">天津高考志愿报名推荐平台</span>
      </router-link>
      <el-button
        type="text"
        icon="el-icon-refresh-right"
        class="btn_01"
        @click="out"
        >退出</el-button
      >
    </header>
    <section id="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-cascader
            :options="options"
            @change="handleChange"
            style="width: 250px"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formInline.tdcj"
            :placeholder="ischange"
          ></el-input>
        </el-form-item>
        <el-form-item label="学校名称">
          <el-input
            v-model="formInline.yxmc"
            placeholder="请输入学校名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" icon="el-icon-search"
            >查询</el-button
          >
        </el-form-item>

        <el-form-item style="margin-left: 200px">
          <el-button type="success" @click="collection">确定收藏</el-button>
          <router-link to="/Collection">
            <el-button type="warning">前往收藏页</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </section>
    <div id="main">
      <template>
        <div>
          <el-table
            :data="
              table.slice((currentPage - 1) * pagesize, currentPage * pagesize)
            "
            style="width: 100%"
            height="500"
            :default-sort="{ prop: 'tdcj', order: 'descending' }"
            border
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
            <el-table-column prop="ljjl" label="离津距离" width="180">
            </el-table-column>
            <el-table-column width="120" label="详情">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="details(scope.row.ksh)"
                  size="small  "
                  icon="el-icon-view"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column label="收藏">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isChecked"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="show(scope.row)"
                >
                </el-switch>
                <el-checkbox
                  v-model="scope.row.isBoxChecked"
                  @change="showBox(scope.row)"
                ></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
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
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index",
  computed: {
    table() {
      return this.$store.state.tableData;
    },
  },
  data() {
    return {
      formInline: {
        tdcj: "",
        yxmc: "",
      },
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数
      value: [], //存放select连级内容
      ischange: "", //placeholder内容
      arr: [], //存放收藏ksh
      options: [
        {
          value: "score",
          label: "成绩",
        },
        {
          value: "total",
          label: "成绩总排名",
        },
        {
          value: "num",
          label: "招生组",
          children: [
            {
              value: "k000000",
              label: "不限",
            },
            {
              value: "one",
              label: "单科",
              children: [
                { value: "k100000", label: "物理" },
                { value: "k010000", label: "化学" },
                { value: "k001000", label: "生物" },
                { value: "k000100", label: "政治" },
                { value: "k000010", label: "历史" },
                { value: "k000001", label: "地理" },
              ],
            },
            {
              value: "two",
              label: "双科",
              children: [
                { value: "a110000", label: "物理和化学" },
                { value: "h110000", label: "物理或化学" },
                { value: "a101000", label: "物理和生物" },
                { value: "h101000", label: "物理或生物" },
                { value: "h100100", label: "物理或政治" },
                { value: "h100010", label: "物理或历史" },
                { value: "a100001", label: "物理和地理" },
                { value: "h100001", label: "物理或地理" },
                { value: "a011000", label: "化学和生物" },
                { value: "h011000", label: "化学或生物" },
                { value: "h010001", label: "化学或地理" },
                { value: "h001010", label: "生物或历史" },
                { value: "a000110", label: "政治和历史" },
                { value: "h000110", label: "政治或历史" },
                { value: "a000011", label: "历史和地理" },
                { value: "h000011", label: "历史或地理" },
              ],
            },
            {
              value: "three",
              label: "三科",
              children: [
                { value: "h111000", label: "物理或化学或生物" },
                { value: "a111000", label: "物理和化学和生物" },
                { value: "h110100", label: "物理或化学或政治" },
                { value: "h110010", label: "物理或化学或历史" },
                { value: "h110001", label: "物理或化学或地理" },
                { value: "h101100", label: "物理或生物或政治" },
                { value: "h101010", label: "物理或生物或历史" },
                { value: "h101001", label: "物理或生物或地理" },
                { value: "h100110", label: "物理或政治或历史" },
                { value: "h100101", label: "物理或政治或地理" },
                { value: "h100011", label: "物理或历史或地理" },
                { value: "h011100", label: "化学或生物或政治" },
                { value: "h011010", label: "化学或生物或历史" },
                { value: "h010110", label: "化学或政治或历史" },
                { value: "h010011", label: "化学或历史或地理" },
                { value: "h001110", label: "生物或政治或历史" },
                { value: "h001101", label: "生物或政治或地理" },
                { value: "h001011", label: "生物或历史或地理" },
                { value: "h000111", label: "政治或历史或地理" },
                { value: "a000111", label: "政治和历史和地理" },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    //====================改变placehoder============

    handleChange(val) {
      this.value = val;
      console.log(val);
      if (val[0] != "score") {
        this.ischange = "请输入排名";
      } else {
        this.ischange = "请输入成绩";
      }
    },

    //====================退出=====================
    out() {
      this.$confirm("此操作将永久删除用户并退出 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.sessionStorage.clear("collection");
          this.$router.replace({ path: "/" });
        })
        .catch(() => {});
    },
    //==================收藏按钮=======================
    collection() {
      if (this.arr.length < 1) {
        this.$message({
          showClose: true,
          message: "当前没有添加收藏",
          type: "error",
        });
      } else {
        this.$message({
          showClose: true,
          message: "收藏成功",
          type: "success",
        });
        let string = window.sessionStorage.getItem("collection");
        if (string == null) {
          window.sessionStorage.setItem("collection", this.arr);
        } else {
          let newarr = string.split(",");
          console.log(newarr);
          for (let i = 0; i < newarr.length; i++) {
            if (this.arr.indexOf(newarr[i]) == -1) {
              this.arr.push(newarr[i]);
            }
          }
          console.log(this.arr);
          window.sessionStorage.setItem("collection", this.arr);
        }
      }
    },
    //收藏开关添加ksh
    show(val) {
      if (val.isChecked == true) {
        this.arr.push(val.ksh);
      } else {
        this.arr.forEach(function (value, index, arr) {
          if (value == val.ksh) {
            arr.splice(index, 1);
          }
        });
      }
      console.log("ksh====" + this.arr);
    },
    showBox(val) {
      if (val.isBoxChecked == true) {
        this.arr.push(val.ksh);
      } else {
        this.arr.forEach(function (value, index, arr) {
          if (value == val.ksh) {
            arr.splice(index, 1);
          }
        });
      }
      console.log("ksh====" + this.arr);
    },

    //=====================提交查询==========================
    onSubmit() {
      if (this.value.length < 1) {
        this.$message({
          showClose: true,
          message: "请选择查询成绩或排名",
          type: "error",
        });
      } else if (this.formInline.tdcj === "" && this.value[0] == "score") {
        this.$message({
          showClose: true,
          message: "请输入成绩",
          type: "error",
        });
      } else if (this.formInline.tdcj === "" && this.value[0] == "num") {
        this.$message({
          showClose: true,
          message: "请输入排名",
          type: "error",
        });
      } else if (this.formInline.tdcj === "" && this.value[0] == "total") {
        this.$message({
          showClose: true,
          message: "请输入成绩总排名",
          type: "error",
        });
      } else if (this.formInline.tdcj > 700 && this.value[0] == "num") {
        this.$message({
          showClose: true,
          message: "输入的值请小于700",
          type: "error",
        });
      } else {
        let that = this;
        if (this.value[0] == "score") {
          let dt = Qs.stringify({
            tdcj: this.formInline.tdcj,
            yxmc: this.formInline.yxmc,
          });
          this.$axios
            .post("http://localhost:8081/maven_SSM5_war_exploded/score", dt)
            .then(function (response) {
              response.data.forEach((ele) => {
                that.$set(ele, "isChecked", false);
                that.$set(ele, "isBoxChecked", false);
              });
              that.$store.commit("addData", response.data);
              if (response.data.length < 1) {
                that.$message({
                  showClose: true,
                  message: "暂无数据",
                  type: "error",
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else if (this.value[0] == "total") {
          let dt = Qs.stringify({
            tdcj: this.formInline.tdcj,
            yxmc: this.formInline.yxmc,
          });
          console.log(dt);
          this.$axios
            .post("http://localhost:8081/maven_SSM5_war_exploded/num", dt)
            .then(function (response) {
              that.$store.commit("addData", response.data);
              if (response.data.length < 1) {
                that.$message({
                  showClose: true,
                  message: "暂无数据",
                  type: "error",
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          let dt;
          if (this.value[1] == "k000000") {
            dt = Qs.stringify({
              fsd: this.formInline.tdcj,
              yxmc: this.formInline.yxmc,
              kc: this.value[1] + "wc",
            });
          } else {
            dt = Qs.stringify({
              fsd: this.formInline.tdcj,
              yxmc: this.formInline.yxmc,
              kc: this.value[2] + "wc",
            });
          }
          console.log(dt);
          this.$axios
            .post("http://localhost:8081/maven_SSM5_war_exploded/newtest", dt)
            .then(function (response) {
              that.$store.commit("addData", response.data);
              if (response.data.length < 1) {
                that.$message({
                  showClose: true,
                  message: "暂无数据",
                  type: "error",
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },
    //=====================处理表格================================
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
    //查询详细信息
    details(id) {
      this.$router.push({
        path: `/Details/${id}`,
      });
    },
  },
};
</script>
<style scoped lang='less'>
header {
  position: relative;
  background-color: #333333;
  height: 40px;
  line-height: 40px;
  text-align: right;
  .span_01 {
    position: absolute;
    left: 10px;
    color: white;
  }

  .btn_01 {
    margin-right: 20px;
  }
}

/* 头部标题结束 */

#top {
  padding-left: 30px;
  position: relative;
  height: 80px;
  background-color: whitesmoke;
  line-height: 80px;
}
/* 搜索格式结束 */

#main {
  padding-top: 20px;
}
</style>
