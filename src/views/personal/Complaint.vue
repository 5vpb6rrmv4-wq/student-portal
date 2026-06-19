<template>
  <div class="page-section">
    <div class="home-card">
      <div class="card-header">
        <span class="card-title"><span class="title-dot"></span>投诉建议</span>
        <el-button type="primary" size="small" round @click="showAddDialog = true">
          <el-icon><Plus /></el-icon>新增
        </el-button>
      </div>
      <div class="card-body">
        <el-table :data="complaints" stripe size="default">
          <el-table-column prop="title" label="标题" min-width="200" />
          <el-table-column prop="category" label="分类" width="100">
            <template #default="{ row }">
              <el-tag :type="catType(row.category)" size="small" round>{{ row.category }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="受理人" width="200">
            <template #default="{ row }">
              <el-tag v-for="r in row.receivers" :key="r" size="small" round class="receiver-tag">{{ r }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="建档时间" width="140" />
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="row.status === '已回复' ? 'success' : 'warning'" size="small" round>{{ row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template #default="{ row }">
              <el-button text type="primary" size="small" @click="handleView(row)">查看</el-button>
              <el-button text type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 16px; justify-content: center;"
          background layout="prev, pager, next"
          :total="complaints.length" :page-size="10"
        />
      </div>
    </div>

    <el-dialog v-model="showAddDialog" title="新增投诉建议" width="600px">
      <el-form :model="newForm" label-width="80px">
        <el-form-item label="标题" required>
          <el-input v-model="newForm.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="分类" required>
          <el-radio-group v-model="newForm.category">
            <el-radio value="意见">意见</el-radio>
            <el-radio value="建议">建议</el-radio>
            <el-radio value="投诉">投诉</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="受理人" required>
          <el-select v-model="newForm.receivers" multiple placeholder="请选择受理人" style="width: 100%;">
            <el-option label="系统管理员" value="系统管理员" />
            <el-option label="辅导员" value="辅导员" />
            <el-option label="学院领导" value="学院领导" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细内容" required>
          <el-input v-model="newForm.content" type="textarea" :rows="5" placeholder="请详细描述您的意见、建议或投诉内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button round @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" round @click="handleSubmit">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const complaints = ref([
  { id: 1, title: '关于课程安排的建议', category: '建议', receivers: ['辅导员', '学院领导'], createDate: '2026-05-20', status: '已回复', content: '建议将算法课程安排在上午...' },
  { id: 2, title: '宿舍网络问题反馈', category: '投诉', receivers: ['系统管理员'], createDate: '2026-05-15', status: '待处理', content: '宿舍网络频繁断线...' },
])

const showAddDialog = ref(false)
const newForm = reactive({ title: '', category: '意见', receivers: [], content: '' })

function catType(cat) {
  return cat === '投诉' ? 'danger' : cat === '建议' ? 'success' : 'warning'
}
function handleView(row) {
  ElMessageBox.alert(row.content, row.title, { confirmButtonText: '关闭', confirmButtonClass: 'el-button--primary' })
}
function handleDelete(id) {
  ElMessageBox.confirm('确定要删除该条投诉建议吗？', '确认', { type: 'warning' }).then(() => {
    complaints.value = complaints.value.filter((c) => c.id !== id)
    ElMessage.success('删除成功')
  })
}
function handleSubmit() {
  if (!newForm.title || !newForm.content || newForm.receivers.length === 0) {
    ElMessage.warning('请填写完整信息'); return
  }
  complaints.value.unshift({ id: Date.now(), ...newForm, createDate: new Date().toISOString().split('T')[0], status: '待处理' })
  ElMessage.success('提交成功')
  showAddDialog.value = false
  Object.assign(newForm, { title: '', category: '意见', receivers: [], content: '' })
}
</script>

<style scoped>
.page-section { max-width: 1000px; }
.home-card {
  background: #fff; border-radius: 14px; border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(15,43,69,.04), 0 4px 16px rgba(15,43,69,.05); overflow: hidden;
}
.card-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 15px 20px; background: rgba(255,255,255,0.48); border-bottom: 1px solid rgba(0,0,0,0.04);
}
.card-title {
  font-size: 15px; font-weight: 700; color: #0f172a;
  display: flex; align-items: center; gap: 8px;
}
.title-dot { width: 10px; height: 10px; border-radius: 50%; background: #153D97; }
.card-body { padding: 20px; }
.receiver-tag { margin-right: 4px; }
</style>
