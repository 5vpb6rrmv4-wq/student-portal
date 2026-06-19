<template>
  <div class="page-section">
    <!-- 个人信息登记更新 -->
    <div class="home-card">
      <div class="card-header">
        <span class="card-title"><span class="title-dot"></span>个人信息登记更新</span>
        <el-button type="primary" size="small" round @click="showAddInfo = true"><el-icon><Plus /></el-icon>新增登记</el-button>
      </div>
      <div class="card-body">
        <el-table :data="paginatedInfos" stripe size="default">
          <el-table-column prop="id" label="编号" width="80" />
          <el-table-column prop="content" label="内容" min-width="280" />
          <el-table-column prop="updateDate" label="登记时间" width="180" />
          <el-table-column label="操作" width="200" align="center">
            <template #default="{ row }">
              <el-button text type="primary" size="small" @click="handleEditInfo(row)">更新</el-button>
              <el-button text type="danger" size="small" @click="handleDeleteInfo(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 12px; justify-content: center;" v-model:current-page="infoPage" background layout="prev, pager, next" :total="infoRecords.length" :page-size="5" />
      </div>
    </div>

    <!-- 意见反馈 -->
    <div class="home-card">
      <div class="card-header">
        <span class="card-title"><span class="title-dot dot-purple"></span>意见反馈</span>
        <el-button type="primary" size="small" round @click="showAddFeedback = true"><el-icon><Plus /></el-icon>新增反馈</el-button>
      </div>
      <div class="card-body">
        <el-table :data="feedbacks" stripe size="default">
          <el-table-column prop="title" label="反馈标题" min-width="200" />
          <el-table-column prop="submitDate" label="提交时间" width="170" />
          <el-table-column label="操作" width="160" align="center">
            <template #default="{ row }">
              <el-button text type="primary" size="small" @click="handleViewFeedback(row)">查看</el-button>
              <el-button text type="danger" size="small" @click="handleDeleteFeedback(row.id)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column label="回复" width="100" align="center">
            <template #default="{ row }">
              <el-button v-if="row.hasReply" text type="success" size="small" @click="handleViewReply(row)">查看回复</el-button>
              <span v-else class="no-reply">暂无</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 揭榜挂帅 -->
    <div class="home-card">
      <div class="card-header"><span class="card-title"><span class="title-dot dot-orange"></span>揭榜挂帅</span></div>
      <div class="card-body">
        <el-table :data="jiebangItems" stripe size="default">
          <el-table-column prop="title" label="项目名称" min-width="260" />
          <el-table-column prop="category" label="类别" width="120" align="center"><template #default="{ row }"><el-tag size="small" round>{{ row.category }}</el-tag></template></el-table-column>
          <el-table-column prop="publishDate" label="发布日期" width="130" align="center" />
          <el-table-column label="操作" width="110" align="center"><template #default><el-button text type="primary" size="small">查看</el-button></template></el-table-column>
        </el-table>
        <el-pagination style="margin-top: 12px; justify-content: center;" background layout="prev, pager, next" :total="jiebangItems.length" :page-size="10" />
      </div>
    </div>

    <!-- Dialogs -->
    <el-dialog v-model="showAddInfo" :title="editingInfo ? '更新信息' : '新增信息登记'" width="600px">
      <el-form :model="infoForm" label-width="80px">
        <el-form-item label="内容" required><el-input v-model="infoForm.content" type="textarea" :rows="5" placeholder="请输入要登记或更新的个人信息" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button round @click="showAddInfo = false">取消</el-button>
        <el-button type="primary" round @click="handleSaveInfo">保存</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="showAddFeedback" title="新增意见反馈" width="650px">
      <el-form :model="feedbackForm" label-width="90px">
        <el-form-item label="反馈标题" required><el-input v-model="feedbackForm.title" placeholder="请输入标题" /></el-form-item>
        <el-form-item label="接收对象" required>
          <el-checkbox-group v-model="feedbackForm.receivers">
            <el-checkbox value="系统管理员">系统管理员</el-checkbox>
          </el-checkbox-group>
          <div style="margin-top: 10px; display: flex; gap: 12px; align-items: center;">
            <el-select v-model="feedbackForm.college" placeholder="选择学院" style="width: 200px;">
              <el-option label="计算机科学与技术学院" value="计算机学院" />
              <el-option label="电子信息工程学院" value="电子工程学院" />
            </el-select>
            <el-checkbox-group v-model="feedbackForm.roles">
              <el-checkbox value="辅导员">辅导员</el-checkbox>
              <el-checkbox value="院级领导">院级领导</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="反馈详情" required>
          <el-input v-model="feedbackForm.content" type="textarea" :rows="6" placeholder="请输入反馈详情" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button round @click="showAddFeedback = false">取消</el-button>
        <el-button type="primary" round @click="handleSubmitFeedback">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const infoRecords = ref([
  { id: 1, content: '工作单位: XX科技有限公司，职位: 算法工程师', updateDate: '2026-07-15 14:30' },
  { id: 2, content: '联系电话变更为: 13900139000', updateDate: '2026-08-01 09:15' },
])
const infoPage = ref(1)
const paginatedInfos = computed(() => infoRecords.value.slice((infoPage.value - 1) * 5, infoPage.value * 5))
const showAddInfo = ref(false)
const editingInfo = ref(null)
const infoForm = reactive({ content: '' })

function handleEditInfo(row) { editingInfo.value = row; infoForm.content = row.content; showAddInfo.value = true }
function handleDeleteInfo(id) {
  ElMessageBox.confirm('确定删除该记录？', '确认', { type: 'warning' }).then(() => {
    infoRecords.value = infoRecords.value.filter(r => r.id !== id); ElMessage.success('删除成功')
  })
}
function handleSaveInfo() {
  if (!infoForm.content) { ElMessage.warning('请输入内容'); return }
  if (editingInfo.value) { editingInfo.value.content = infoForm.content; editingInfo.value.updateDate = new Date().toLocaleString(); ElMessage.success('更新成功') }
  else { infoRecords.value.unshift({ id: Date.now(), content: infoForm.content, updateDate: new Date().toLocaleString() }); ElMessage.success('添加成功') }
  showAddInfo.value = false; editingInfo.value = null; infoForm.content = ''
}

const feedbacks = ref([
  { id: 1, title: '关于校友系统的改进建议', submitDate: '2026-07-20 10:30', hasReply: true, reply: '感谢您的建议，我们已记录并将优化。', content: '建议增加校友通讯录功能...' },
  { id: 2, title: '毕业生档案查询问题', submitDate: '2026-08-05 16:00', hasReply: false, reply: '', content: '无法查询到个人档案状态...' },
])
const showAddFeedback = ref(false)
const feedbackForm = reactive({ title: '', receivers: [], college: '', roles: [], content: '' })

function handleViewFeedback(row) { ElMessageBox.alert(row.content || '暂无详细内容', row.title, { confirmButtonText: '关闭' }) }
function handleViewReply(row) { ElMessageBox.alert(row.reply, '回复详情', { confirmButtonText: '关闭' }) }
function handleDeleteFeedback(id) {
  ElMessageBox.confirm('确定删除该反馈？', '确认', { type: 'warning' }).then(() => {
    feedbacks.value = feedbacks.value.filter(f => f.id !== id); ElMessage.success('删除成功')
  })
}
function handleSubmitFeedback() {
  if (!feedbackForm.title || !feedbackForm.content) { ElMessage.warning('请填写完整信息'); return }
  feedbacks.value.unshift({ id: Date.now(), title: feedbackForm.title, submitDate: new Date().toLocaleString(), hasReply: false, reply: '', content: feedbackForm.content })
  ElMessage.success('反馈提交成功'); showAddFeedback.value = false
  Object.assign(feedbackForm, { title: '', receivers: [], college: '', roles: [], content: '' })
}

const jiebangItems = ref([
  { title: '智能交通流量预测模型研究', category: '科研攻关', publishDate: '2026-06-01' },
  { title: '基于联邦学习的隐私保护方案', category: '技术创新', publishDate: '2026-05-15' },
])
</script>

<style scoped>
.page-section { max-width: 1000px; display: flex; flex-direction: column; gap: 16px; }
.home-card {
  background: #fff; border-radius: 14px; border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(15,43,69,.04), 0 4px 16px rgba(15,43,69,.05); overflow: hidden;
}
.card-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 15px 20px; background: rgba(255,255,255,0.48); border-bottom: 1px solid rgba(0,0,0,0.04);
}
.card-title { font-size: 15px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px; }
.title-dot { width: 10px; height: 10px; border-radius: 50%; background: #153D97; }
.title-dot.dot-purple { background: #8b5cf6; }
.title-dot.dot-orange { background: #f4ca91; }
.card-body { padding: 20px; }
.no-reply { color: #64748b; font-size: 12px; }
</style>
