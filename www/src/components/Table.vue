<template>
  <div class="Table">
    <Form inline class="btn-form">
      <Form-item>
        <Input v-model="searchStr" icon="search" placeholder="全局搜索"></Input>
      </Form-item>
      <Form-item>
        <Page :total="pageTotal" :current.sync="pageCurrent" :page-size="config.pageSize" show-total show-sizer @on-change="changePage" @on-page-size-change="updatePageSize"></Page>
      </Form-item>
      <Form-item class="self-btn" v-for="item in buttons" :key="item.text">
        <Button :type="item.type||'ghost'" @click="item.click(currentRow)">{{$t(`button.${item.text}`)}}</Button>
      </Form-item>
      <Form-item class="self-btn">
        <Button type="ghost" @click="emitRefresh">{{$t(`button.refresh`)}}</Button>
      </Form-item>
    </Form>
    <div class="m-table">
      <Table highlight-row :data="tableRows" :columns="columns" :sortMethod="setSort" @on-current-change="currentChange" :loading="loading" stripe></Table>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.buttons = this.buttons.reverse();
  },
  props: {
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
    buttons: {
      type: Array,
      default() {
        return [];
      },
    },
    config: {
      type: Object,
      default() {
        return {
          pageSize: 10,
        };
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    rows: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      modalSelect: '',
      modalCascader: [],
      currentRow: '',
      sort: {
        prop: '',
        task: 'descending',
      },
      searchStr: '',
      pageCurrent: 1,
    };
  },
  computed: {
    filterRows() {
      const filterRows = [];
      const { prop } = this.sort;
      const task = this.sort.order === 'ascending';
      const searchParams = new RegExp(this.searchStr);
      this.rows.forEach((element) => {
        if (JSON.stringify(element).match(searchParams)) {
          filterRows.push(element);
        }
      }, this);
      if (prop && filterRows.length) {
        const sortFunc = task ? (i1, i2) => {
          const val1 = i1[prop] || '';
          const val2 = i2[prop] || '';
          return val1.localeCompare(val2);
        } : (i1, i2) => {
          const val1 = i1[prop] || '';
          const val2 = i2[prop] || '';
          return val2.localeCompare(val1);
        };
        filterRows.sort(sortFunc);
      }
      return filterRows;
    },
    tableRows() {
      const tableRows = this.filterRows.slice(
        (this.pageCurrent - 1) * this.config.pageSize,
        this.pageCurrent * this.config.pageSize,
      );
      return tableRows;
    },
    pageTotal() {
      return this.filterRows.length;
    },
  },
  methods: {
    emitRefresh() {
      this.$emit('refresh');
    },
    currentChange(currentRow) {
      this.currentRow = currentRow;
    },
    setSort(sort) {
      this.sort = sort;
    },
    updateSelectedData(v) {
      this.selectedData = v;
    },
    /************************Page Start*********************************/
    updatePageSize(v) {
      this.config.pageSize = v;
    },
    changePage(v) {
      this.pageCurrent = v;
    },
  },
};

</script>


<style scoped>
.Table {
  height: 100%;
}

.btn-form {
  margin-left: 15px;
  margin-top: 15px;
}

.self-btn {
  float: right;
}

.m-table {
  height: calc(100% - 72px);
  overflow-y: auto;
}
</style>
