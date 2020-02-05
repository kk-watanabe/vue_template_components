import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import ElementUI from "element-ui";
import Dialog from "@/components/atoms/Dialog.vue";
import IconButton from "@/components/atoms/IconButton.vue";

const localVue = createLocalVue();
localVue.use(ElementUI);

const DEFAULT_VISIBLE = true;

const shallowFactory = (slot = {}) => {
  return shallowMount(Dialog, {
    localVue,
    ...slot,
    propsData: {
      visible: DEFAULT_VISIBLE
    }
  });
};

const factory = (slot = {}) => {
  return mount(Dialog, {
    localVue,
    ...slot,
    propsData: {
      visible: DEFAULT_VISIBLE
    }
  });
};

describe("Dialog.vue", () => {
  describe("Slot", () => {
    // default slotの値が表示される
    it("Renders default slot", () => {
      const slotText = "defaultText";
      const wrapper = shallowFactory({
        slots: {
          default: slotText
        }
      });
      expect(wrapper.text()).toBe(slotText);
    });
    // title slotの値が表示される
    it("Renders header slot", () => {
      const slotText = "titleText";
      const wrapper = factory({
        slots: {
          title: slotText
        }
      });
      expect(wrapper.props().title).toBe("");
      expect(wrapper.find(".el-dialog__header").text()).toBe(slotText);
    });
    // footer slotの値が表示される
    it("Renders footer slot", () => {
      const slotText = "footerText";
      const wrapper = factory({
        slots: {
          footer: slotText
        }
      });
      expect(wrapper.find(".el-dialog__footer").text()).toBe(slotText);
    });
  });
  describe("Prop", () => {
    // visible prop に値が渡っている
    it("Has visible prop", () => {
      const wrapper = shallowFactory();

      expect(wrapper.props().visible).toBe(DEFAULT_VISIBLE);
    });
    // title prop に値が渡っている
    it("Has title prop", async () => {
      const title = "titleText";
      const wrapper = shallowFactory();
      wrapper.setProps({ title });
      await Vue.nextTick();

      expect(wrapper.props().title).toBe(title);
      expect(wrapper.vm.$slots.title).toBe(undefined);
    });
    // width prop に値が渡っている
    it("Has width prop", async () => {
      const width = "450px";
      const wrapper = shallowFactory();
      wrapper.setProps({ width });
      await Vue.nextTick();

      expect(wrapper.props().width).toBe(width);
    });
    // top prop に値が渡っている
    it("Has top prop", async () => {
      const top = "0px";
      const wrapper = shallowFactory();
      wrapper.setProps({ top });
      await Vue.nextTick();

      expect(wrapper.props().top).toBe(top);
    });
    // appendToBody prop に値が渡っている
    it("Has appendToBody prop", async () => {
      const appendToBody = false;
      const wrapper = shallowFactory();
      wrapper.setProps({ appendToBody });
      await Vue.nextTick();

      expect(wrapper.props().appendToBody).toBe(appendToBody);
    });
    // closeOnClickModal prop に値が渡っている
    it("Has closeOnClickModal prop", async () => {
      const closeOnClickModal = false;
      const wrapper = shallowFactory();
      wrapper.setProps({ closeOnClickModal });
      await Vue.nextTick();

      expect(wrapper.props().closeOnClickModal).toBe(closeOnClickModal);
    });
    // showCloseButton prop に値が渡っている
    it("Has showCloseButton prop", async () => {
      const showCloseButton = false;
      const wrapper = shallowFactory();
      expect(wrapper.find(IconButton).exists()).toBe(true);

      wrapper.setProps({ showCloseButton });
      await Vue.nextTick();
      expect(wrapper.props().showCloseButton).toBe(showCloseButton);
      expect(wrapper.find(IconButton).exists()).toBe(false);
    });
    // center prop に値が渡っている
    it("Has center prop", async () => {
      const center = false;
      const wrapper = shallowFactory();
      wrapper.setProps({ center });
      await Vue.nextTick();

      expect(wrapper.props().center).toBe(center);
    });
    // destroyOnClose prop に値が渡っている
    it("Has destroyOnClose prop", async () => {
      const destroyOnClose = false;
      const wrapper = shallowFactory();
      wrapper.setProps({ destroyOnClose });
      await Vue.nextTick();

      expect(wrapper.props().destroyOnClose).toBe(destroyOnClose);
    });
  });
  describe("Emit", () => {
    // open emitが動作する
    it("open emit works", () => {
      const wrapper = shallowFactory();
      wrapper.vm.$emit("open");

      expect(wrapper.emitted("open")).toBeTruthy();
      expect(wrapper.emitted("open").length).toBe(1);
    });

    // close emitが動作する
    it("close emit works", () => {
      const wrapper = shallowFactory();
      wrapper.vm.$emit("close");

      expect(wrapper.emitted("close")).toBeTruthy();
      expect(wrapper.emitted("close").length).toBe(1);
    });

    // iconButtton をクリックしたとき close emitが動作する
    it("close emit works when iconButton click", () => {
      const wrapper = shallowFactory();
      const iconButton = wrapper.find(IconButton);
      iconButton.vm.$emit("click");

      expect(wrapper.emitted("close")).toBeTruthy();
      expect(wrapper.emitted("close").length).toBe(1);
    });
  });
});