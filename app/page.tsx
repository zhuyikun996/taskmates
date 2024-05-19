'use client'
import { ChangeEvent,useState} from "react";

export default function Home() {
  const [studentNames, setStudentNames] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [allowRepeat, setAllowRepeat] = useState(false);

  const handleInputChange = (event:ChangeEvent<HTMLTextAreaElement>) => {
    setStudentNames(event.target.value);
  };

  const handleDraw = () => {
    const namesArray :string[]= studentNames.split(" ").filter(name => name.trim() !== "");
    const duplicateNames = findDuplicates(namesArray);
    if (duplicateNames.length > 0) {
      alert(`您输入的名字有重复，重复的名字是: ${duplicateNames.join(", ")}`);
      return;
    }
    let availableStudents :string[] = namesArray;
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
        textarea {
          color: black; /* 设置文字颜色为黑色 */
        }
      `}</style>
      <h1>随机点名器</h1>
      <textarea
        rows={4}
        cols={50}
        value={studentNames}
        onChange={handleInputChange}
        placeholder="输入学生姓名，用空格隔开"
      ></textarea>
      <br />
      <label>
        <input
          type="checkbox"
          checked={allowRepeat}
          onChange={handleRepeatChange}
        />
        允许重复抽取
      </label>
      <br />
      <button onClick={handleDraw}>抽取</button>
      <button onClick={handleReset}>重置</button>
      {selectedStudent && <p>本次被点名的是：{selectedStudent}</p>}
      {history.length > 0 && (
        <div>
          <h2>点名历史记录：</h2>
          <ul>
            {history.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}