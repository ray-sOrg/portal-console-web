import { Button } from "antd";
import { flask_env } from "api";

function Test() {
  const handleTestEnv = () => {
    flask_env().subscribe({
      next: res => {
        console.log(res);
      },
      error: error => {
        console.log(error);
      }
    });
  };
  return (
    <div style={{ padding: "12px" }}>
      <Button onClick={handleTestEnv}>Flask ENV</Button>
    </div>
  );
}

export default Test;
