<template>
  <div class="page-section">
    <div class="home-card">
      <div class="card-header">
        <span class="card-title"><span class="title-dot"></span>个人信息</span>
      </div>
      <div class="card-body">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-form :model="form" label-width="110px" size="default" class="info-form">
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="学号"><el-input v-model="form.studentId" disabled /></el-form-item>
                  <el-form-item label="姓名"><el-input v-model="form.name" disabled /></el-form-item>
                  <el-form-item label="性别">
                    <el-radio-group v-model="form.gender" disabled>
                      <el-radio value="male">男</el-radio>
                      <el-radio value="female">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="出生日期"><el-input v-model="form.birthDate" disabled /></el-form-item>
                  <el-form-item label="民族"><el-input v-model="form.ethnicity" disabled /></el-form-item>
                  <el-form-item label="政治面貌"><el-input v-model="form.politicalStatus" disabled /></el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号"><el-input v-model="form.idCard" disabled /></el-form-item>
                  <el-form-item label="学院"><el-input v-model="form.college" disabled /></el-form-item>
                  <el-form-item label="专业"><el-input v-model="form.major" disabled /></el-form-item>
                  <el-form-item label="入学日期"><el-input v-model="form.enrollDate" disabled /></el-form-item>
                  <el-form-item label="学制"><el-input v-model="form.duration" disabled /></el-form-item>
                  <el-form-item label="导师"><el-input v-model="form.advisor" disabled /></el-form-item>
                </el-col>
              </el-row>
              <el-divider />
              <el-form-item label="手机号码"><el-input v-model="form.phone" /></el-form-item>
              <el-form-item label="电子邮箱"><el-input v-model="form.email" /></el-form-item>
              <el-form-item label="家庭住址"><el-input v-model="form.address" type="textarea" :rows="2" /></el-form-item>
              <el-form-item>
                <el-button type="primary" round @click="handleSave">保存修改</el-button>
                <el-button round @click="handleReset">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="学籍信息">
            <el-descriptions :column="2" border size="default">
              <el-descriptions-item label="学号">2023301001</el-descriptions-item>
              <el-descriptions-item label="姓名">张三</el-descriptions-item>
              <el-descriptions-item label="培养层次">硕士研究生</el-descriptions-item>
              <el-descriptions-item label="学习形式">全日制</el-descriptions-item>
              <el-descriptions-item label="入学年份">2023</el-descriptions-item>
              <el-descriptions-item label="预计毕业">2026</el-descriptions-item>
              <el-descriptions-item label="学籍状态" :span="2">
                <el-tag type="success" round>在籍</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  studentId: '2023301001', name: '张三', gender: 'male',
  birthDate: '2000-03-15', ethnicity: '汉族', politicalStatus: '共青团员',
  idCard: '32010220000315****', college: '计算机科学与技术学院',
  major: '计算机科学与技术', enrollDate: '2023-09-01', duration: '3年',
  advisor: '李教授', phone: '13800138000', email: 'zhangsan@example.com',
  address: '江苏省南京市鼓楼区XX路XX号',
})

function handleSave() { ElMessage.success('个人信息保存成功') }
function handleReset() { ElMessage.info('已重置') }
</script>

<style scoped>
.page-section { max-width: 1000px; }
.home-card {
  background: #fff;
  
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(15,43,69,.03), 0 4px 16px rgba(15,43,69,.04);
  overflow: hidden;
}
.card-header {
  padding: 15px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
}
.card-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
}
.title-dot {
  width: 10px; height: 10px; border-radius: 50%; background: #153D97;
}
.card-body { padding: 20px; }
.info-form { max-width: 800px; }
</style>
