<template>
  <div class="notification-panel">
    <!-- 通知公告 -->
    <div class="notif-card">
      <div class="card-header">
        <div class="header-left">
          <span class="dot dot-notice"></span>
          <span class="header-title">通知公告</span>
          <span class="badge">{{ displayNotifs.length }}</span>
        </div>
        <button class="more-btn" @click="openMore('notice')">more →</button>
      </div>
      <div class="notif-body">
        <div
          v-for="(item, idx) in displayNotifs"
          :key="item.id"
          class="notif-row"
          :style="{ animationDelay: `${idx * 0.01}s` }"
        >
          <div class="notif-left">
            <span class="dot-indicator" :class="{ unread: !item.read }"></span>
            <span
              class="notif-title"
              :class="item.read ? 'read' : 'unread'"
              @click="handleViewNotif(item)"
            >
              {{ item.title }}
            </span>
          </div>
          <div class="notif-right">
            <button
              v-if="!item.read"
              class="action-btn ignore-btn"
              @click="handleIgnoreNotif(item)"
            >
              忽略
            </button>
            <span v-else class="done-mark">已读</span>
          </div>
        </div>
        <div v-if="displayNotifs.length === 0" class="empty-hint">暂无通知</div>
      </div>
    </div>

    <!-- 待办提醒 -->
    <div class="notif-card todo-card">
      <div class="card-header">
        <div class="header-left">
          <span class="dot dot-todo"></span>
          <span class="header-title">待办提醒</span>
          <span class="badge badge-warn">{{ pendingCount }}</span>
        </div>
        <button class="more-btn" @click="openMore('todo')">more →</button>
      </div>
      <div class="notif-body">
        <div
          v-for="(item, idx) in displayTodos"
          :key="item.id"
          class="notif-row"
          :style="{ animationDelay: `${idx * 0.01}s` }"
        >
          <div class="notif-left">
            <span class="dot-indicator" :class="{ unread: item.status === 'pending' }"></span>
            <span
              class="notif-title"
              :class="item.status !== 'pending' ? 'read' : 'unread'"
              @click="handleViewTodo(item)"
            >
              {{ item.title }}
            </span>
          </div>
          <div class="notif-right">
            <button
              v-if="item.status === 'pending'"
              class="action-btn process-btn"
              @click="handleProcessTodo(item)"
            >
              办理
            </button>
            <el-tag v-else-if="item.status === 'done'" type="success" size="small" round>已办理</el-tag>
            <el-tag v-else type="info" size="small" round>已忽略</el-tag>
          </div>
        </div>
        <div v-if="displayTodos.length === 0" class="empty-hint">暂无待办，干得漂亮 🎉</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const displayNotifs = computed(() => userStore.notifications.slice(0, 5))
const displayTodos = computed(() => {
  const pending = userStore.todos.filter((t) => t.status === 'pending')
  const rest = userStore.todos.filter((t) => t.status !== 'pending')
  return [...pending, ...rest].slice(0, 5)
})
const pendingCount = computed(() => userStore.todos.filter((t) => t.status === 'pending').length)

function handleViewNotif(item) {
  userStore.markNotifRead(item.id)
  ElMessage.info(`查看通知: ${item.title}`)
}
function handleIgnoreNotif(item) {
  userStore.markNotifRead(item.id)
  ElMessage.success('已忽略')
}
function handleViewTodo(item) { ElMessage.info(`查看待办: ${item.title}`) }
function handleProcessTodo(item) {
  ElMessageBox.confirm(`确认办理 "${item.title}"？`, '办理确认', {
    confirmButtonText: '确认办理',
    cancelButtonText: '取消',
    confirmButtonClass: 'el-button--primary',
  }).then(() => {
    userStore.markTodoDone(item.id)
    ElMessage.success('办理成功')
  })
}
function openMore(type) { ElMessage.info(`打开${type === 'notice' ? '通知公告' : '待办提醒'}完整列表`) }
</script>

<style scoped>
.notification-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px 0;
}

.notif-card {
  background: #fff;
  
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(15,43,69,.03), 0 4px 16px rgba(15,43,69,.04);
  overflow: hidden;
  transition: box-shadow 0.08s;
}
.notif-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.06), 0 2px 4px rgba(0,0,0,.04); }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.dot-notice { background: #153D97; }
.dot-todo   { background: #108B96; }

.header-title {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 9px;
  border-radius: 99px;
  background: #E8EDF5;
  color: #153D97;
}
.badge-warn {
  background: #EBFAFF;
  color: #B2151E;
}

.more-btn {
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 500;
  color: #153D97;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.05s;
  font-family: inherit;
}
.more-btn:hover { background: #E8EDF5; }

.notif-body { padding: 4px 0; }

.notif-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 18px;
  transition: all 0.05s;
  animation: fadeSlide 0.12s ease-out both;
}
.notif-row:hover { background: #fafcfd; }

@keyframes fadeSlide {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.notif-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.dot-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: #e2e8f0;
}
.dot-indicator.unread { background: #153D97; box-shadow: 0 0 0 3px rgba(21,61,151,.18); }

.notif-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  font-size: 13px;
  transition: color 0.05s;
}
.notif-title.unread { font-weight: 600; color: #0f172a; }
.notif-title.unread:hover { color: #153D97; }
.notif-title.read { color: #475569; }

.notif-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  margin-left: 12px;
}


.action-btn {
  border: none;
  padding: 4px 14px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.05s;
  font-family: inherit;
  white-space: nowrap;
}
.process-btn {
  background: #E8EDF5;
  color: #153D97;
}
.process-btn:hover { background: #153D97; color: #fff; }
.ignore-btn {
  background: #f8fafc;
  color: #475569;
}
.ignore-btn:hover { background: #e2e8f0; color: #64748b; }

.done-mark {
  font-size: 11px;
  color: #475569;
}

.empty-hint {
  padding: 32px 0;
  text-align: center;
  color: #475569;
  font-size: 13px;
}

@media (max-width: 900px) {
  .notification-panel { grid-template-columns: 1fr; }
}
</style>
