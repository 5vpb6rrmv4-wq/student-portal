<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">学术成果</div></template>
      <el-tabs type="border-card">
        <!-- 论文信息登记 -->
        <el-tab-pane label="论文信息登记">
          <el-button type="primary" size="small" style="margin-bottom: 12px;"><el-icon><Plus /></el-icon>登记论文</el-button>
          <el-table :data="papers" stripe size="default">
            <el-table-column prop="title" label="论文标题" min-width="260" />
            <el-table-column prop="journal" label="期刊/会议" min-width="180" />
            <el-table-column prop="level" label="级别" width="100"><template #default="{ row }"><el-tag :type="levelType(row.level)" size="small">{{ row.level }}</el-tag></template></el-table-column>
            <el-table-column prop="publishDate" label="发表日期" width="120" />
            <el-table-column prop="status" label="状态" width="100"><template #default="{ row }"><el-tag :type="row.status==='已发表'?'success':'warning'" size="small">{{ row.status }}</el-tag></template></el-table-column>
            <el-table-column label="操作" width="160"><template #default><el-button text type="primary" size="small">编辑</el-button><el-button text type="danger" size="small">删除</el-button></template></el-table-column>
          </el-table>
          <el-pagination style="margin-top: 16px; justify-content: center;" background layout="prev, pager, next" :total="papers.length" :page-size="10" />
        </el-tab-pane>

        <!-- 科研成果登记 -->
        <el-tab-pane label="科研成果登记">
          <el-button type="primary" size="small" style="margin-bottom: 12px;"><el-icon><Plus /></el-icon>登记成果</el-button>
          <el-table :data="achievements" stripe size="default">
            <el-table-column prop="name" label="成果名称" min-width="220" />
            <el-table-column prop="category" label="成果类别" width="120"><template #default="{ row }"><el-tag size="small">{{ row.category }}</el-tag></template></el-table-column>
            <el-table-column prop="date" label="完成时间" width="120" />
            <el-table-column label="操作" width="160"><template #default><el-button text type="primary" size="small">编辑</el-button><el-button text type="danger" size="small">删除</el-button></template></el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 发明专利登记 -->
        <el-tab-pane label="发明专利登记">
          <el-button type="primary" size="small" style="margin-bottom: 12px;"><el-icon><Plus /></el-icon>登记专利</el-button>
          <el-table :data="patents" stripe size="default">
            <el-table-column prop="name" label="专利名称" min-width="240" />
            <el-table-column prop="type" label="专利类型" width="120"><template #default="{ row }"><el-tag size="small">{{ row.type }}</el-tag></template></el-table-column>
            <el-table-column prop="patentNo" label="专利号" min-width="160" />
            <el-table-column prop="applyDate" label="申请日期" width="120" />
            <el-table-column label="状态" width="100"><template #default="{ row }"><el-tag :type="row.status==='已授权'?'success':'info'" size="small">{{ row.status }}</el-tag></template></el-table-column>
            <el-table-column label="操作" width="120"><template #default><el-button text type="primary" size="small">查看</el-button></template></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const papers = ref([
  { title: '基于深度学习的图像识别算法研究', journal: 'IEEE Transactions on Image Processing', level: 'SCI一区', publishDate: '2026-03-15', status: '已发表' },
  { title: 'A Survey of Federated Learning', journal: 'ACM Computing Surveys', level: 'SCI一区', publishDate: '', status: '审稿中' },
])
const achievements = ref([
  { name: '智能推荐算法优化系统', category: '软件著作权', date: '2025-12-10' },
  { name: '大规模图数据处理框架', category: '技术报告', date: '2025-10-20' },
])
const patents = ref([
  { name: '一种基于注意力机制的图像分类方法', type: '发明专利', patentNo: 'CN202310012345.6', applyDate: '2025-08-15', status: '已授权' },
])

function levelType(l) { return l.startsWith('SCI') ? 'danger' : l.startsWith('EI') ? 'warning' : 'info' }
</script>
<style scoped>.page-section { max-width: 1100px; }</style>
