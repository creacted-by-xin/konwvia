import './index.css'

export default function ChatInput() {
  return (
    <div className="chat-input">
      <h1 className="chat-input-header">产品需求知识库</h1>
      <div className="chat-input-content">
        {/* 聊天内容区域 */}
      </div>
      <textarea
        className="chat-input__textarea"
        maxLength={500}
        placeholder="输入问题，按业务背景、目标、约束描述得越清楚，回答越准确"
      />
    </div>
  )
}
