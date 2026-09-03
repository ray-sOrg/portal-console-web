import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  notification
} from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { finalize } from "rxjs";
import {
  createDish,
  updateDish,
  type Dish,
  type DishMutation,
  type DishNutrition
} from "@/api/dish";
import {
  CATEGORY_OPTIONS,
  FITNESS_CATEGORY,
  NUTRITION_BASIS_OPTIONS,
  SERVING_UNIT_LABELS,
  SERVING_UNIT_OPTIONS
} from "./constants";
import styles from "./index.module.css";

interface DishFormDrawerProps {
  dish: Dish | null;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

type DishFormValues = Omit<DishMutation, "id">;

const initialValues: DishFormValues = {
  name: "",
  nameEn: "",
  description: "",
  descEn: "",
  price: 0,
  image: "",
  category: "RECOMMENDED",
  isSpicy: false,
  isVegetarian: false,
  isAvailable: true,
  nutrition: {
    basis: "PER_100G",
    defaultServingAmount: 100,
    servingUnit: "g",
    caloriesKcal: 0,
    proteinG: null,
    carbohydrateG: null,
    fatG: null,
    fiberG: null,
    sugarG: null,
    sodiumMg: null,
    labelImageUrl: ""
  }
};

const getBasisAmount = (basis?: DishNutrition["basis"]) =>
  basis === "PER_SERVING" ? 1 : 100;

const formatNutrient = (value?: number | null) =>
  Number.isFinite(value) ? Number(value).toFixed(1).replace(/\.0$/, "") : "—";

function DishFormDrawer({
  dish,
  open,
  onClose,
  onSaved
}: DishFormDrawerProps) {
  const [form] = Form.useForm<DishFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const category = Form.useWatch("category", form);
  const nutrition = Form.useWatch("nutrition", form);
  const isFitnessMeal = category === FITNESS_CATEGORY;

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue(
      dish
        ? {
            ...dish,
            nutrition: dish.nutrition ?? initialValues.nutrition
          }
        : initialValues
    );
  }, [dish, form, open]);

  const nutritionPreview = useMemo(() => {
    if (!nutrition) return null;
    const basisAmount = getBasisAmount(nutrition.basis);
    const servingAmount = Number(nutrition.defaultServingAmount) || 0;
    const multiplier = basisAmount > 0 ? servingAmount / basisAmount : 0;
    const calculate = (value?: number | null) =>
      value == null ? null : Number(value) * multiplier;

    return {
      amount: servingAmount,
      unit: SERVING_UNIT_LABELS[nutrition.servingUnit] ?? "",
      calories: calculate(nutrition.caloriesKcal),
      protein: calculate(nutrition.proteinG),
      carbohydrate: calculate(nutrition.carbohydrateG),
      fat: calculate(nutrition.fatG)
    };
  }, [nutrition]);

  const handleFinish = (values: DishFormValues) => {
    setSubmitting(true);

    const payload: DishMutation = {
      ...values,
      id: dish?.id ?? crypto.randomUUID(),
      nutrition:
        values.category === FITNESS_CATEGORY || dish?.nutrition
          ? values.nutrition
          : null
    };
    const request = dish
      ? updateDish(dish.id, payload)
      : createDish(payload);

    request.pipe(finalize(() => setSubmitting(false))).subscribe({
      next: response => {
        if (response.code !== 200) {
          notification.error({
            message: dish ? "更新菜品失败" : "创建菜品失败",
            description: response.message
          });
          return;
        }
        notification.success({
          message: dish ? "菜品已更新" : "菜品已创建"
        });
        form.resetFields();
        onSaved();
      },
      error: () => {
        notification.error({
          message: "保存失败",
          description: "请检查网络连接或稍后重试"
        });
      }
    });
  };

  return (
    <Drawer
      className={styles.drawer}
      width="min(760px, 100vw)"
      title={dish ? "编辑菜品" : "添加菜品"}
      open={open}
      onClose={onClose}
      destroyOnHidden
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            loading={submitting}
            onClick={() => form.submit()}
          >
            保存菜品
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFinish}
        requiredMark="optional"
        scrollToFirstError
      >
        <section className={styles.formSection}>
          <div className={styles.sectionHeading}>
            <span>01</span>
            <div>
              <h3>基本信息</h3>
              <p>用于菜单展示和点餐识别。</p>
            </div>
          </div>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="菜品名称"
                rules={[{ required: true, message: "请输入菜品名称" }]}
              >
                <Input placeholder="例如：纯牛奶" maxLength={80} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="nameEn" label="英文名称">
                <Input placeholder="可选" maxLength={80} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="category"
                label="菜品分类"
                rules={[{ required: true, message: "请选择菜品分类" }]}
              >
                <Select options={CATEGORY_OPTIONS} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="price"
                label="价格"
                rules={[{ required: true, message: "请输入价格" }]}
              >
                <InputNumber
                  min={0}
                  precision={2}
                  prefix="¥"
                  className={styles.fullWidth}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="image" label="菜品图片地址">
                <Input placeholder="https://..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="description" label="中文描述">
                <Input.TextArea rows={3} maxLength={500} showCount />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="descEn" label="英文描述">
                <Input.TextArea rows={3} maxLength={500} showCount />
              </Form.Item>
            </Col>
          </Row>

          <Space size="large" wrap>
            <Form.Item name="isAvailable" valuePropName="checked" noStyle>
              <Switch checkedChildren="已上架" unCheckedChildren="已下架" />
            </Form.Item>
            <Form.Item name="isSpicy" valuePropName="checked" noStyle>
              <Switch checkedChildren="辣" unCheckedChildren="不辣" />
            </Form.Item>
            <Form.Item name="isVegetarian" valuePropName="checked" noStyle>
              <Switch checkedChildren="素食" unCheckedChildren="非素食" />
            </Form.Item>
          </Space>
        </section>

        {isFitnessMeal ? (
          <>
            <Divider />
            <section className={styles.formSection}>
              <div className={styles.sectionHeading}>
                <span>02</span>
                <div>
                  <h3>份量与营养</h3>
                  <p>录入营养表标示值，系统会换算默认点餐份量。</p>
                </div>
              </div>

              <Alert
                className={styles.formAlert}
                type="info"
                showIcon
                message="请确认营养表采用每 100g、每 100ml 还是每份，图片中没有的数据保持为空。"
              />

              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    name={["nutrition", "basis"]}
                    label="营养基准"
                    rules={[{ required: true, message: "请选择营养基准" }]}
                  >
                    <Select options={NUTRITION_BASIS_OPTIONS} />
                  </Form.Item>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Item
                    name={["nutrition", "defaultServingAmount"]}
                    label="默认点餐份量"
                    rules={[{ required: true, message: "请输入默认份量" }]}
                  >
                    <InputNumber min={0.01} className={styles.fullWidth} />
                  </Form.Item>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Item
                    name={["nutrition", "servingUnit"]}
                    label="份量单位"
                    rules={[{ required: true, message: "请选择份量单位" }]}
                  >
                    <Select options={SERVING_UNIT_OPTIONS} />
                  </Form.Item>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Item
                    name={["nutrition", "caloriesKcal"]}
                    label="热量（kcal）"
                    rules={[{ required: true, message: "请输入热量" }]}
                  >
                    <InputNumber min={0} precision={2} className={styles.fullWidth} />
                  </Form.Item>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Item name={["nutrition", "proteinG"]} label="蛋白质（g）">
                    <InputNumber min={0} precision={2} className={styles.fullWidth} />
                  </Form.Item>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Item name={["nutrition", "carbohydrateG"]} label="碳水（g）">
                    <InputNumber min={0} precision={2} className={styles.fullWidth} />
                  </Form.Item>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Item name={["nutrition", "fatG"]} label="脂肪（g）">
                    <InputNumber min={0} precision={2} className={styles.fullWidth} />
                  </Form.Item>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Item name={["nutrition", "fiberG"]} label="膳食纤维（g）">
                    <InputNumber min={0} precision={2} className={styles.fullWidth} />
                  </Form.Item>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Item name={["nutrition", "sugarG"]} label="糖（g）">
                    <InputNumber min={0} precision={2} className={styles.fullWidth} />
                  </Form.Item>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Item name={["nutrition", "sodiumMg"]} label="钠（mg）">
                    <InputNumber min={0} precision={2} className={styles.fullWidth} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={["nutrition", "labelImageUrl"]}
                    label="营养成分表图片地址"
                    extra="图片识别接口接入后，可通过此图片自动填充上方字段。"
                  >
                    <Input placeholder="https://..." />
                  </Form.Item>
                </Col>
              </Row>

              {nutritionPreview ? (
                <div className={styles.nutritionPreview} aria-live="polite">
                  <div className={styles.previewTitle}>
                    <span>默认份量预览</span>
                    <strong>
                      {formatNutrient(nutritionPreview.amount)} {nutritionPreview.unit}
                    </strong>
                  </div>
                  <dl>
                    <div>
                      <dt>热量</dt>
                      <dd>{formatNutrient(nutritionPreview.calories)} kcal</dd>
                    </div>
                    <div>
                      <dt>蛋白质</dt>
                      <dd>{formatNutrient(nutritionPreview.protein)} g</dd>
                    </div>
                    <div>
                      <dt>碳水</dt>
                      <dd>{formatNutrient(nutritionPreview.carbohydrate)} g</dd>
                    </div>
                    <div>
                      <dt>脂肪</dt>
                      <dd>{formatNutrient(nutritionPreview.fat)} g</dd>
                    </div>
                  </dl>
                </div>
              ) : null}
            </section>
          </>
        ) : null}
      </Form>
    </Drawer>
  );
}

export default DishFormDrawer;
