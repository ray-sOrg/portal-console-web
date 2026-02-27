import { useEffect, useState } from "react";
import { Table, Button, Tag, Space, message, Switch } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getDishList, toggleDishAvailability, deleteDish, Dish } from "@/api/dish";

function MenuList() {
  const [loading, setLoading] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([]);

  const fetchDishes = () => {
    setLoading(true);
    getDishList().subscribe({
      next: (res) => {
        setLoading(false);
        if (res.code === 200) {
          setDishes(res.data);
        } else {
          message.error(res.message);
        }
      },
      error: (err) => {
        setLoading(false);
        message.error("获取菜品列表失败");
      }
    });
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleToggleAvailability = (id: string) => {
    toggleDishAvailability(id).subscribe({
      next: (res) => {
        if (res.code === 200) {
          message.success("更新成功");
          fetchDishes();
        } else {
          message.error(res.message);
        }
      }
    });
  };

  const handleDelete = (id: string) => {
    deleteDish(id).subscribe({
      next: (res) => {
        if (res.code === 200) {
          message.success("删除成功");
          fetchDishes();
        } else {
          message.error(res.message);
        }
      }
    });
  };

  const columns: ColumnsType<Dish> = [
    {
      title: "菜品名称",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "英文名",
      dataIndex: "nameEn",
      key: "nameEn",
      width: 150,
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category",
      width: 100,
      render: (category) => {
        const colorMap: Record<string, string> = {
          APPETIZER: "green",
          MAIN_COURSE: "blue",
          SOUP: "orange",
          DESSERT: "purple"
        };
        return <Tag color={colorMap[category] || "default"}>{category}</Tag>;
      }
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price) => `¥${price}`
    },
    {
      title: "标签",
      key: "tags",
      width: 120,
      render: (_, record) => (
        <Space>
          {record.isSpicy && <Tag color="red">辣</Tag>}
          {record.isVegetarian && <Tag color="green">素</Tag>}
        </Space>
      )
    },
    {
      title: "上架",
      key: "isAvailable",
      width: 80,
      render: (_, record) => (
        <Switch
          checked={record.isAvailable}
          onChange={() => handleToggleAvailability(record.id)}
        />
      )
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small" danger onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <h2>菜单管理</h2>
        <Button type="primary">添加菜品</Button>
      </div>
      <Table
        columns={columns}
        dataSource={dishes}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default MenuList;
