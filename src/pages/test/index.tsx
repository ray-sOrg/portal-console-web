import { Button } from "antd";
import { flask_env, celery } from "@/api";

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

  const handleTestCelery = () => {
    celery().subscribe({
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
      <Button onClick={handleTestCelery}>Celery</Button>
    </div>
  );
}

export default Test;
