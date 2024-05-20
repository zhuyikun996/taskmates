'use client'
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [studentNames, setStudentNames] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setStudentNames(event.target.value);
  };

  const handleDraw = () => {
    const namesArray: string[] = studentNames.split(" ").filter(name => name.trim() !== "");
    const duplicateNames = findDuplicates(namesArray);
    if (studentNames.trim() === "") { // 检查输入是否为空
      alert("请先输入待抽取人的姓名，再点击抽取");
      return;
    }
    if (duplicateNames.length > 0) {
      alert(`您输入的名字有重复，重复的名字是: ${duplicateNames.join(", ")}`);
      return;
    }
    let availableStudents: string[] = namesArray;
    if (!allowRepeat) {
      availableStudents = namesArray.filter(name => !history.includes(name));
      if (availableStudents.length === 0) {
        alert("所有学生都已被抽中！");
        return;
      }
    }
    const randomIndex = Math.floor(Math.random() * availableStudents.length);
    const student = availableStudents[randomIndex];
    setSelectedStudent(student);
    setHistory(prevHistory => [...prevHistory, student]);
    setShowModal(true);
    setModalContent("正在抽取中");
    setTimeout(() => {
      setModalContent(student);
    }, 5000); // 5秒后更新 modalContent
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleReset = () => {
    setStudentNames("");
    setSelectedStudent(null);
    setHistory([]);
  };
  const handleRepeatChange = () => {
    setAllowRepeat(!allowRepeat);
  };

  const findDuplicates = (arr: string | any[]) => {
    const duplicates = [];
    const seen: { [key: string]: boolean } = {}; // 使用索引签名确保 seen 对象可以接受任何字符串作为键
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (seen[item]) {
        duplicates.push(item);
      } else {
        seen[item] = true;
      }
    }
    return duplicates;
  };

  return (
    <div>
      <style jsx>{`
        .banner {
          background-color: #ffffff;
          padding: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .banner-left {
          font-weight: bold;
          font-size: 28px;
          color: black;
        }

        .banner-right {
          color: black;
        }

        .content {
          margin-top: 20px; /* 添加一些顶部间距 */
        }
      
        textarea {
          color: black; /* 设置文字颜色为黑色 */
          width: 100%;
          padding-left: 20px;
          padding-right: 20px;
        }

        .textarea-container {
          display: flex;
          justify-content: center; /* 水平居中 */
          padding: 0 20px; /* 左右边距为 20px */
          margin-top: 20px;
        }
        .textarea-container inputTextArea {
          width: 100%;
        }

        .button-container {
          display: flex;
          padding: 0 20px; /* 左右边距为 20px */
          margin-top: 20px;
          justify-content: space-between;
        }

        .google-button {
          background-color: #ffffff; /* 背景颜色为白色 */
          border: 1px solid #4285f4; /* 边框为实线，颜色为 Google 蓝色 */
          color: #4285f4; /* 文字颜色为 Google 蓝色 */
          padding: 8px 16px; /* 内边距为 8px 上下，16px 左右 */
          font-size: 16px; /* 字体大小为 16px */
          cursor: pointer; /* 鼠标悬停时显示手型光标 */
          border-radius: 4px; /* 圆角半径为 4px */
          transition: background-color 0.3s, color 0.3s; /* 设置过渡效果 */
          width: 33.33%;
        }
        
        .google-button:hover {
          background-color: #4285f4; /* 鼠标悬停时背景颜色变为 Google 蓝色 */
          color: #ffffff; /* 鼠标悬停时文字颜色变为白色 */
        }

        .result-container {
          display: flex;
          padding: 0 20px; /* 左右边距为 20px */
          margin-top: 20px;
          flex-direction: column; /* 设置主轴方向为垂直方向，即上下布局 */
        }

        .modal-background {
          display: ${showModal ? "flex" : "none"}; /* 根据 showModal 状态决定是否显示弹窗背景 */
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5); /* 添加半透明黑色背景 */
          z-index: 998; /* 弹窗背景的层级低于弹窗，以确保点击弹窗背景可以关闭弹窗 */
        }

        .modal {
          display: ${showModal ? "flex" : "none"}; /* 根据 showModal 状态决定是否显示弹窗 */
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 33.33%; /* 设置弹窗宽度为屏幕的三分之一 */
          height: 33.33%; /* 设置弹窗高度为屏幕的三分之一 */
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          z-index: 999;
          align-items: center; /* 垂直居中 */
          justify-content: center; /* 水平居中 */
        }

        .modal-content {
          font-size: 48px;
          color: black;
        }

      `}</style>

      <div className="modal-background" onClick={handleCloseModal}></div>
        <div className="modal">
        <div className="modal-content">{modalContent}</div>
      </div>

      <div className="banner">
        <div className="banner-left">TaskMates</div>
        <h1 className="banner-right">随机点名器</h1>
      </div>
      <div className="textarea-container">
        <textarea
          className="inputTextArea rounded-md border border-blue-500"
          rows={4}
          cols={50}
          value={studentNames}
          onChange={handleInputChange}
          placeholder="输入姓名，用空格隔开"
        ></textarea>
      </div>
      <br />

      <div className="button-container">  
        <button className="google-button" onClick={handleDraw}>抽取</button>
        <button className="google-button" onClick={handleReset}>重置</button>
        <label>
          <input
            type="checkbox"
            checked={allowRepeat}
            onChange={handleRepeatChange}
          />
          允许重复抽取
        </label>
      </div>

      <div className="result-container">
        {selectedStudent && <p>本次被点名的是：{selectedStudent}</p>}
          {history.length > 0 && (
            <div>
              <br />
              <h2>点名历史记录：</h2>
              <ul>
                {history.map((student, index) => (
                  <li key={index}>{student}</li>
                ))}
              </ul>
              <br />
            </div>
          )}
      </div>

    </div>
  );
}