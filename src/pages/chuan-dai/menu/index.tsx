import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Empty,
  Input,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  message
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  deleteDish,
  getDishList,
  toggleDishAvailability,
  type Dish,
  type DishCategory
} from "@/api/dish";
import DishFormDrawer from "./dish-form-drawer";
import {
  CATEGORY_LABELS,
  CATEGORY_OPTIONS,
  FITNESS_CATEGORY,
  SERVING_UNIT_LABELS
} from "./constants";
import styles from "./index.module.css";

type CategoryFilter = DishCategory | "ALL";

const formatNumber = (value?: number | null) =>
  value == null ? "—" : Number(value).toFixed(1).replace(/\.0$/, "");

function MenuList() {
  const [loading, setLoading] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [category, setCategory] = useState<CategoryFilter>("ALL");
  const [keyword, setKeyword] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  const fetchDishes = useCallback(() => {
    setLoading(true);
    const subscription = getDishList().subscribe({
      next: response => {
        if (response.code === 200) {
          setDishes(response.data);
        } else {
          message.error(response.message);
        }
      },
      error: () => {
        message.error("获取菜品列表失败");
        setLoading(false);
      },
      complete: () => setLoading(false)
    });
    return subscription;
  }, []);

  useEffect(() => {
    const subscription = fetchDishes();
    return () => subscription.unsubscribe();
  }, [fetchDishes]);

  const filteredDishes = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    return dishes.filter(dish => {
      const matchesCategory = category === "ALL" || dish.category === category;
      const matchesKeyword =
        !normalizedKeyword ||
        dish.name.toLowerCase().includes(normalizedKeyword) ||
        dish.nameEn?.toLowerCase().includes(normalizedKeyword);
      return matchesCategory && Boolean(matchesKeyword);
    });
  }, [category, dishes, keyword]);

  const handleToggleAvailability = useCallback(
    (id: string) => {
      toggleDishAvailability(id).subscribe({
        next: response => {
          if (response.code === 200) {
            message.success("上架状态已更新");
            fetchDishes();
          } else {
            message.error(response.message);
          }
        },
        error: () => message.error("更新上架状态失败")
      });
    },
    [fetchDishes]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteDish(id).subscribe({
        next: response => {
          if (response.code === 200) {
            message.success("菜品已删除");
            fetchDishes();
          } else {
            message.error(response.message);
          }
        },
        error: () => message.error("删除菜品失败")
      });
    },
    [fetchDishes]
  );

  const handleAdd = () => {
    setEditingDish(null);
    setDrawerOpen(true);
  };

  const handleEdit = (dish: Dish) => {
    setEditingDish(dish);
    setDrawerOpen(true);
  };

  const columns: ColumnsType<Dish> = useMemo(
    () => [
      {
        title: "菜品",
        key: "dish",
        width: 250,
        fixed: "left",
        render: (_, dish) => (
          <div className={styles.dishCell}>
            {dish.image ? (
              <img src={dish.image} alt="" loading="lazy" />
            ) : (
              <span className={styles.imagePlaceholder} aria-hidden="true">
                {dish.name.slice(0, 1)}
              </span>
            )}
            <div>
              <strong>{dish.name}</strong>
              <span>{dish.nameEn || dish.description || "暂无描述"}</span>
            </div>
          </div>
        )
      },
      {
        title: "分类",
        dataIndex: "category",
        key: "category",
        width: 120,
        render: (value: DishCategory) => (
          <Tag color={value === FITNESS_CATEGORY ? "green" : "default"}>
            {CATEGORY_LABELS[value] ?? value}
          </Tag>
        )
      },
      {
        title: "营养摘要",
        key: "nutrition",
        width: 260,
        render: (_, dish) => {
          if (dish.category !== FITNESS_CATEGORY) {
            return <span className={styles.muted}>普通菜品</span>;
          }
          if (!dish.nutrition) {
            return <span className={styles.missing}>待完善营养数据</span>;
          }
          const nutrition = dish.nutrition;
          return (
            <div className={styles.nutritionCell}>
              <strong>{formatNumber(nutrition.caloriesKcal)} kcal</strong>
              <span>
                蛋白质 {formatNumber(nutrition.proteinG)}g · 碳水{" "}
                {formatNumber(nutrition.carbohydrateG)}g · 脂肪{" "}
                {formatNumber(nutrition.fatG)}g
              </span>
            </div>
          );
        }
      },
      {
        title: "默认份量",
        key: "serving",
        width: 110,
        render: (_, dish) =>
          dish.nutrition ? (
            <span>
              {formatNumber(dish.nutrition.defaultServingAmount)}
              {SERVING_UNIT_LABELS[dish.nutrition.servingUnit]}
            </span>
          ) : (
            <span className={styles.muted}>—</span>
          )
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "price",
        width: 90,
        render: (price: number) => `¥${Number(price).toFixed(2)}`
      },
      {
        title: "标签",
        key: "tags",
        width: 110,
        render: (_, dish) => (
          <Space size={4} wrap>
            {dish.isSpicy ? <Tag color="red">辣</Tag> : null}
            {dish.isVegetarian ? <Tag color="green">素食</Tag> : null}
            {!dish.isSpicy && !dish.isVegetarian ? (
              <span className={styles.muted}>—</span>
            ) : null}
          </Space>
        )
      },
      {
        title: "上架",
        key: "isAvailable",
        width: 80,
        render: (_, dish) => (
          <Switch
            checked={dish.isAvailable}
            onChange={() => handleToggleAvailability(dish.id)}
            aria-label={`${dish.name}${dish.isAvailable ? "下架" : "上架"}`}
          />
        )
      },
      {
        title: "操作",
        key: "action",
        width: 130,
        fixed: "right",
        render: (_, dish) => (
          <Space size={2}>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(dish)}
            >
              编辑
            </Button>
            <Popconfirm
              title="删除菜品"
              description={`确定删除“${dish.name}”吗？`}
              okText="删除"
              cancelText="取消"
              okButtonProps={{ danger: true }}
              onConfirm={() => handleDelete(dish.id)}
            >
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                aria-label={`删除${dish.name}`}
              />
            </Popconfirm>
          </Space>
        )
      }
    ],
    [handleDelete, handleToggleAvailability]
  );

  const fitnessCount = dishes.filter(
    dish => dish.category === FITNESS_CATEGORY
  ).length;

  return (
    <section className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p>MENU CATALOG</p>
          <h1>菜单管理</h1>
          <span>维护聚会菜单、健身餐营养数据与上架状态。</span>
        </div>
        <div className={styles.summary} aria-label="菜单数据摘要">
          <div>
            <span>全部菜品</span>
            <strong>{dishes.length}</strong>
          </div>
          <div>
            <span>健身餐</span>
            <strong>{fitnessCount}</strong>
          </div>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索菜品名称"
            allowClear
            value={keyword}
            onChange={event => setKeyword(event.target.value)}
          />
          <Select<CategoryFilter>
            value={category}
            onChange={setCategory}
            options={[
              { value: "ALL", label: "全部分类" },
              ...CATEGORY_OPTIONS
            ]}
          />
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加菜品
        </Button>
      </div>

      <Table
        className={styles.table}
        columns={columns}
        dataSource={filteredDishes}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1150 }}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        locale={{ emptyText: <Empty description="暂无符合条件的菜品" /> }}
      />

      <DishFormDrawer
        dish={editingDish}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSaved={() => {
          setDrawerOpen(false);
          fetchDishes();
        }}
      />
    </section>
  );
}

export default MenuList;
