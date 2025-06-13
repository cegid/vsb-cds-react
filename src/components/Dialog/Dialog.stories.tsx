import type { Meta, StoryObj } from "@storybook/react";

import Dialog from "./Dialog";
import Typography from "../Typography";
import Button from "../Button";

const meta = {
  title: "Components/Display/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["info", "alert"],
      description: "The visual variant that determines the dialog's appearance",
    },
    title: {
      control: { type: "text" },
      description: "The title text displayed in the dialog header",
    },
    content: {
      control: false,
      description: "Optional content to display in the dialog body",
    },
    actions: {
      control: false,
      description: "Optional array of action buttons",
    },
    image: {
      control: false,
      description: "Optional image to display (only shown for info variant)",
    },
  },
  args: {
    title: "Dialog Title",
    variant: "alert",
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Confirm Action",
    content: (
      <Typography component="p" variant="bodySRegular" color="neutral/60">
        Lorem ipsum dolor sit amet consectetur. Varius amet tincidunt porta nibh
        arcu. Vitae nunc consequat malesuada orci quam sed fusce. Amet amet amet
        diam erat eu id natoque enim tellus. Elit sapien tincidunt consectetur
        tristique imperdiet elementum morbi volutpat.
      </Typography>
    ),
    actions: [
      <Button key="cancel" variant="outlined" color="neutral" fullWidth>
        Cancel
      </Button>,
      <Button key="confirm" variant="contained" fullWidth>
        Confirm
      </Button>,
    ],
    variant: "alert",
  },
};

export const Alert: Story = {
  args: {
    title: "Delete Item",
    variant: "alert",
    content: (
      <Typography component="p" variant="bodySRegular" color="neutral/60">
        Are you sure you want to delete this item? This action cannot be undone.
      </Typography>
    ),
    actions: [
      <Button key="cancel" variant="outlined" color="neutral">
        Cancel
      </Button>,
      <Button key="delete" variant="contained" color="error">
        Delete
      </Button>,
    ],
  },
};

export const Info: Story = {
  args: {
    title: "Welcome to the Platform",
    variant: "info",
    content: (
      <Typography component="p" variant="bodySRegular" color="neutral/60">
        Discover all the amazing features we have prepared for you. Get started
        by exploring the dashboard and customizing your experience.
      </Typography>
    ),
    actions: [
      <Button key="skip" color="neutral" variant="outlined" fullWidth>
        Skip
      </Button>,
      <Button key="get-started" variant="contained" fullWidth>
        Get Started
      </Button>,
    ],
    image: (
      <svg
        width="151"
        height="150"
        viewBox="0 0 151 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M62.953 96.1264C73.2599 91.2919 71.9155 53.6639 58.6262 61.1445C58.6262 61.1445 44.6492 67.853 35.1226 76.0979C25.5961 84.3429 25.3488 93.616 28.3273 97.3214C31.3058 101.027 52.6422 100.961 62.953 96.1264Z"
          fill="#85CAFF"
        />
        <path
          d="M109.246 60.4848C107.593 58.5487 99.7697 54.7929 81.9604 55.6387C75.7291 55.9336 66.0673 55.468 58.6268 61.1444C54.8177 64.0505 54.246 71.8687 54.7057 80.0516C54.8911 83.3651 55.2466 86.7407 55.6251 89.8679C56.0037 92.9991 56.4016 95.8858 56.6798 98.2293C56.9232 100.305 57.1743 101.966 57.0198 102.963C55.6947 111.53 54.6014 124.307 54.6014 124.307C54.6014 124.307 52.7703 129.545 78.2247 130.883C103.679 132.222 117.115 122.006 115.728 119.092C114.712 115.476 113.468 105.586 112.603 101.023C111.054 92.8361 110.196 89.4761 110.293 82.6861C110.467 69.9908 110.899 62.4248 109.246 60.4848Z"
          fill="#85CAFF"
        />
        <path
          d="M54.7043 80.0552C54.8898 83.3687 55.2452 86.7443 55.6238 89.8715C56.0024 93.0027 56.4003 95.8894 56.6784 98.2329"
          stroke="#2F7EFF"
          stroke-width="1.14225"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M64.9487 101.027C66.6794 101.027 68.0817 99.6182 68.0817 97.88V68.6559C68.0817 66.9177 66.6794 65.5093 64.9487 65.5093H11.633C9.90233 65.5093 8.5 66.9177 8.5 68.6559V97.88C8.5 99.6182 9.90233 101.027 11.633 101.027H64.9487Z"
          fill="#E8F7FF"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M68.0817 73.2695H8.5V79.9703H68.0817V73.2695Z"
          fill="#2F7EFF"
        />
        <path
          d="M57.7084 96.1259C60.2697 96.1259 62.3443 94.0424 62.3443 91.4699C62.3443 88.8975 60.2697 86.814 57.7084 86.814C55.1472 86.814 53.0726 88.8975 53.0726 91.4699C53.0726 94.0424 55.1472 96.1259 57.7084 96.1259Z"
          fill="#85CAFF"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.3044 93.0605H30.1247"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.3046 89.8828H30.1248"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M72.7608 57.5553C72.1312 59.9298 72.6527 62.5023 74.2829 64.3336C75.496 65.6955 77.4237 66.8595 80.4833 67.0108C84.868 67.2281 87.5993 65.6683 89.2605 63.9805C90.8637 62.3471 91.5707 60.0346 91.2539 57.7648C90.8019 54.5561 90.0911 48.6042 90.1683 43.3546C90.2804 35.7187 74.5997 43.1644 73.9314 47.6575C73.9314 47.6575 75.4651 46.6913 74.7967 49.613C74.3447 51.5374 73.3712 55.2506 72.7608 57.5553Z"
          fill="#E8F7FF"
        />
        <path
          d="M91.2493 57.7609C90.7973 54.5522 90.0865 48.6003 90.1637 43.3506C90.2758 35.7148 74.5951 43.1605 73.9268 47.6535C73.9268 47.6535 75.4605 46.6874 74.7921 49.6091C74.3479 51.5374 73.3744 55.2505 72.764 57.5514"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M95.6818 24.5289C94.8783 24.1525 94.2447 19.8535 88.4306 18.577C82.0062 17.1647 79.9857 19.9893 77.1231 18.868C70.9073 16.4352 66.3719 19.3956 64.8498 24.2767C63.9381 27.2022 64.1119 30.8222 65.6649 34.3763C67.1677 37.8139 67.5502 42.272 67.5502 42.272C68.883 37.3444 69.7483 32.1142 69.7483 32.1142C76.9222 36.7198 80.9322 32.0133 84.4554 30.407C87.2099 29.1538 91.3782 28.1217 90.4742 37.1116C89.9411 42.4233 89.8098 39.071 92.0852 46.9707C92.6647 48.9844 92.2783 49.5315 92.2783 49.5315C98.3435 42.7919 103.373 28.1295 95.6818 24.5289Z"
          fill="#2F7EFF"
        />
        <path
          d="M69.1595 38.7183C69.1595 38.7183 68.3985 35.8549 65.9608 36.4175C63.5231 36.9801 63.8013 45.5626 69.3643 46.2532L69.1595 38.7183Z"
          fill="#E8F7FF"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M66.3519 40.1343L67.9822 41.535C67.48 40.2546 66.3519 40.1343 66.3519 40.1343Z"
          fill="#E8F7FF"
        />
        <path
          d="M67.5335 41.7139C67.6069 41.904 67.7885 42.0204 67.9816 42.0204C68.0396 42.0204 68.1014 42.0088 68.1593 41.9855C68.4066 41.8885 68.5302 41.6053 68.4297 41.357C67.8271 39.8205 66.4595 39.6575 66.4016 39.6537C66.1273 39.6226 65.9032 39.8166 65.8723 40.0804C65.8414 40.3443 66.0307 40.5848 66.2934 40.6198C66.3282 40.6236 67.151 40.74 67.5335 41.7139Z"
          fill="#2F7EFF"
        />
        <path
          d="M94.549 37.2007C94.4486 24.5519 82.55 23.7682 78.6289 24.3502C75.3181 24.8429 69.0868 26.5889 68.4339 33.3944C67.2248 46.0044 69.7397 56.0962 77.9798 57.493C88.3602 59.2584 94.6572 50.5168 94.549 37.2007Z"
          fill="#E8F7FF"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M87.4102 40.3083C87.4333 39.3267 86.8732 38.5157 86.1585 38.5002C85.4438 38.4847 84.845 39.2646 84.818 40.2462C84.7948 41.2279 85.3549 42.0388 86.0696 42.0543C86.7843 42.0698 87.387 41.2899 87.4102 40.3083Z"
          fill="#2F7EFF"
        />
        <path
          d="M74.9753 40.2933C74.9985 39.3117 74.4383 38.5007 73.7236 38.4852C73.0089 38.4658 72.4101 39.2496 72.3831 40.2312C72.3599 41.2128 72.9201 42.0238 73.6348 42.0393C74.3494 42.0548 74.9482 41.2749 74.9753 40.2933Z"
          fill="#2F7EFF"
        />
        <path
          d="M83.7281 35.0941C83.9406 34.6557 84.269 34.4074 84.6553 34.2289C85.0416 34.0582 85.4704 34.0155 85.8761 34.0543C86.2817 34.097 86.668 34.225 87.0041 34.4074C87.1741 34.5005 87.3248 34.613 87.4754 34.7294C87.6145 34.8536 87.7459 34.9894 87.8617 35.1368C87.997 35.3114 87.9699 35.5636 87.7922 35.7033C87.7111 35.7654 87.6145 35.7925 87.5218 35.7887L87.4677 35.7848C87.2977 35.7731 87.1432 35.746 86.9925 35.7188C86.838 35.7072 86.6989 35.6723 86.556 35.6567C86.2778 35.6218 86.019 35.5985 85.7718 35.5908C85.5245 35.5908 85.2966 35.6063 85.0494 35.6179C84.9257 35.6218 84.8021 35.6335 84.663 35.6373C84.5356 35.6412 84.3772 35.6684 84.242 35.649L83.9986 35.6141C83.8015 35.5869 83.6625 35.4045 83.6895 35.2028C83.7011 35.164 83.7127 35.1291 83.7281 35.0941Z"
          fill="#2F7EFF"
        />
        <path
          d="M70.3558 35.2067C70.4678 34.9933 70.5876 34.8497 70.7383 34.71C70.8851 34.5742 71.055 34.4656 71.2366 34.3802C71.5997 34.2095 72.017 34.1436 72.4187 34.1785C72.8205 34.2134 73.2184 34.3182 73.5545 34.516C73.8945 34.7062 74.1765 34.9622 74.3851 35.2726C74.5087 35.455 74.4624 35.7072 74.2769 35.8313C74.1958 35.8857 74.107 35.909 74.0181 35.9012L73.9524 35.8973C73.7863 35.8818 73.6434 35.8469 73.5004 35.8197C73.3536 35.8081 73.2262 35.7615 73.0948 35.7615C72.836 35.715 72.5964 35.7188 72.3647 35.7149C72.1329 35.7149 71.9049 35.746 71.6616 35.7615C71.4182 35.7693 71.14 35.812 70.8387 35.7926L70.6803 35.7809C70.464 35.7654 70.3017 35.5792 70.3172 35.3619C70.3172 35.3076 70.3326 35.2532 70.3558 35.2067Z"
          fill="#2F7EFF"
        />
        <path
          d="M92.2171 41.1625C93.6194 42.7107 104.475 28.6768 88.5316 23.0236C78.8582 19.5976 69.9807 20.9052 68.2113 26.9191C66.442 32.9331 66.8785 34.9623 66.8785 34.9623C66.8785 34.9623 67.8057 39.1838 68.5049 38.4543C68.5049 38.4543 67.6512 32.7197 70.2047 30.1318C72.7621 27.5477 75.7368 32.6731 79.7931 31.2182C83.355 29.9416 88.0642 28.184 90.5637 30.8922C93.5538 34.1359 91.1238 39.952 92.2171 41.1625Z"
          fill="#2F7EFF"
        />
        <path
          d="M97.2074 37.973C94.8161 37.1543 93.7035 39.6142 93.7035 39.6142L92.5909 46.3305C98.2891 46.4353 99.5987 38.7917 97.2074 37.973Z"
          fill="#E8F7FF"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M94.5493 42.2874L96.3611 41.2437C96.3649 41.2475 95.2137 41.2049 94.5493 42.2874Z"
          fill="#E8F7FF"
        />
        <path
          d="M94.5492 42.7726C94.7115 42.7726 94.8699 42.6912 94.9626 42.5437C95.4455 41.7522 96.2606 41.7328 96.3456 41.7328C96.3572 41.7328 96.3572 41.7328 96.3649 41.7328C96.6238 41.7328 96.8363 41.5272 96.8478 41.2633C96.8556 40.9956 96.6469 40.7706 96.3804 40.7628C96.3224 40.7551 94.9394 40.7279 94.1398 42.0354C94.0007 42.2644 94.0702 42.5631 94.2982 42.7028C94.3754 42.7494 94.4643 42.7726 94.5492 42.7726Z"
          fill="#2F7EFF"
        />
        <path
          d="M79.225 46.3342L75.8409 38.8691C75.8409 38.8691 74.1874 45.4768 75.5627 46.3342C76.9419 47.1917 79.225 46.3342 79.225 46.3342Z"
          fill="#E8F7FF"
        />
        <path
          d="M75.9597 38.3997C75.7009 38.3337 75.4382 38.4928 75.3725 38.7528C74.963 40.3824 73.7538 45.7755 75.3068 46.7494C75.8554 47.0908 76.5044 47.2034 77.1264 47.2034C78.2776 47.2034 79.3245 46.8154 79.3902 46.7921C79.6413 46.699 79.7649 46.4196 79.6722 46.1674C79.5795 45.9152 79.2975 45.7872 79.0502 45.8842C78.4746 46.0976 76.771 46.5244 75.8129 45.9269C75.1793 45.5311 75.5618 41.9537 76.3035 38.9894C76.3769 38.7256 76.2185 38.4618 75.9597 38.3997Z"
          fill="#2F7EFF"
        />
        <path
          d="M81.1721 49.9965C81.1721 49.9965 82.9144 49.9111 83.9883 48.4678L81.1721 49.9965Z"
          fill="#E8F7FF"
        />
        <path
          d="M81.1941 50.4817C81.2752 50.4778 83.1759 50.3653 84.3735 48.7589C84.5319 48.5455 84.4894 48.239 84.2769 48.08C84.0644 47.9209 83.7592 47.9636 83.6008 48.177C82.6853 49.4069 81.1709 49.5117 81.1477 49.5117C80.8812 49.5272 80.6764 49.7522 80.6919 50.0199C80.7034 50.2799 80.9159 50.4817 81.1748 50.4817C81.1786 50.4817 81.1863 50.4817 81.1941 50.4817Z"
          fill="#2F7EFF"
        />
        <path
          d="M17.6926 72.5745C18.6391 73.3389 19.686 72.8966 19.686 72.8966C19.686 72.8966 20.6132 76.4041 22.9659 75.5932C24.4493 75.081 24.6425 73.1876 24.6425 73.1876C24.6425 73.1876 25.1177 76.7261 27.1265 76.6446C29.1392 76.567 29.5024 73.6221 29.5024 73.6221C29.5024 73.6221 30.7965 74.2197 32.1602 72.8927C33.5239 71.5658 32.3843 67.5461 33.466 66.2579C34.1266 65.4664 35.4864 65.4975 36.0427 65.5052C36.4058 65.5091 37.3291 65.4819 38.1829 65.5052C41.4937 65.5867 40.976 63.8873 40.3347 63.7631C38.5345 63.4139 36.0195 62.8164 35.1696 62.0792C34.0223 61.082 33.4158 60.147 32.0521 59.7279C31.4726 59.5495 30.6961 59.468 29.823 59.3632C29.201 59.2895 28.5559 58.8782 27.8412 58.82C26.8213 58.7347 25.701 59.014 24.6154 58.9636C23.6883 58.9209 22.7341 58.4165 21.8494 58.401C20.8334 58.3816 19.8985 58.8511 19.0563 58.8666C17.6038 58.8899 14.8377 62.1413 15.1661 64.6012C15.5293 67.2978 16.0508 71.2476 17.6926 72.5745Z"
          fill="#E8F7FF"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.2702 63.2975C19.1272 63.7126 19.0422 64.1511 19.0384 64.5895C18.9959 68.4889 19.6912 72.8966 19.6912 72.8966V62.0869L19.2702 63.2975Z"
          fill="#E8F7FF"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24.3691 62.9442C24.0871 63.5301 23.9249 64.1703 23.9094 64.8222C23.8399 68.1279 24.6434 73.1913 24.6434 73.1913L24.9293 61.7764L24.3691 62.9442Z"
          fill="#E8F7FF"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M29.784 62.0869L29.2432 64.1433C28.4358 73.3078 29.5059 73.626 29.5059 73.626L29.784 62.0869Z"
          fill="#E8F7FF"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M70.0903 56.4843C70.0903 56.4843 67.5058 58.3389 68.4755 64.1395C69.4181 69.7538 75.3481 74.177 76.5881 73.2691C78.2454 72.0585 81.3437 67.0262 81.3437 67.0262C81.3437 67.0262 85.1953 72.8462 86.4392 73.3855C87.6832 73.9248 94.548 69.7499 95.5023 63.701C96.4449 57.7298 94.1424 55.8208 94.1424 55.8208"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M83.4919 74.1151L84.7706 71.7444L81.3479 67.0264L77.9946 71.8259C77.9946 71.8259 79.2734 74.0297 79.6713 74.1112C80.0692 74.1927 83.4919 74.1151 83.4919 74.1151Z"
          fill="#2F7EFF"
        />
        <path
          d="M83.5814 120.26C84.4583 120.426 90.087 110.614 90.4153 108.953C90.7476 107.289 83.4925 74.1149 83.4925 74.1149C83.4925 74.1149 82.1713 72.5358 79.6719 74.1149C79.6719 74.1149 74.2711 106.625 75.2253 109.283C76.1795 111.945 82.7044 120.093 83.5814 120.26Z"
          fill="#2F7EFF"
        />
        <path
          d="M80.3888 103.273C81.6057 103.149 82.5561 102.668 82.5561 102.668C83.8425 102.466 85.6273 103.308 87.7404 103.397C88.629 103.436 96.7687 104.495 102.494 104.418C102.981 104.41 103.471 104.406 103.974 104.398C104.151 97.1582 104.058 89.8367 101.42 83.3066C90.3519 84.1176 89.7029 84.5172 82.726 84.5482C79.2067 84.5638 74.1112 84.2883 72.1719 84.2068C65.7204 83.9352 62.4753 83.2756 63.0084 85.3553C63.5647 87.5242 66.7789 87.3729 70.4991 88.4864C74.5361 89.697 73.2574 91.2916 73.2574 91.2916C73.2574 91.2916 72.423 92.7428 71.9748 94.966C71.5847 96.8866 73.9798 97.3211 73.9798 97.3211C73.4235 100.111 76.4291 100.173 76.4291 100.173C76.1393 102.249 79.1874 103.393 80.3888 103.273Z"
          fill="#E8F7FF"
        />
        <path
          d="M103.972 104.398C110.686 104.313 118.868 104.135 127.599 100.034C143.369 92.6266 138.976 79.1243 128.325 70.5379C117.999 62.2153 108.809 59.511 108.148 59.6313C94.8432 62.1106 108.291 82.8374 108.291 82.8374C105.618 83.0043 103.358 83.1595 101.418 83.303C104.057 89.8369 104.15 97.1584 103.972 104.398Z"
          fill="#85CAFF"
        />
        <path
          d="M108.153 59.6353C108.733 59.9728 118.001 62.2193 128.331 70.5419C138.982 79.1244 143.37 92.6267 127.604 100.038C118.221 104.445 109.471 104.321 102.498 104.422C96.7725 104.503 88.6328 103.44 87.7442 103.401C85.6272 103.312 83.8463 102.47 82.5599 102.672C82.5599 102.672 81.6095 103.153 80.3926 103.277C79.1912 103.398 76.147 102.253 76.4367 100.177C76.4367 100.177 73.4273 100.115 73.9875 97.3254C73.9875 97.3254 71.5923 96.8908 71.9825 94.9703C72.4345 92.747 73.2651 91.2959 73.2651 91.2959C73.2651 91.2959 74.5438 89.7012 70.5029 88.4907C66.7827 87.3771 63.5685 87.5285 63.0122 85.3595C62.4791 83.2799 65.7241 83.9433 72.1756 84.2111C74.115 84.2925 79.2105 84.568 82.7298 84.5525C90.9314 84.5137 101.972 83.1557 119.886 82.0305"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M73.9832 97.3214C73.9832 97.3214 75.8491 92.7198 77.6029 91.2454C78.8121 90.2288 79.3298 90.0659 80.3883 89.6973"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M76.4335 100.173C76.4335 100.173 76.7658 97.5034 79.582 95.3229C80.7217 94.4383 82.2283 93.9727 82.7305 93.9727"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M82.5522 102.668C82.5522 102.668 83.5064 101.228 82.4866 100.328C81.9573 99.8626 83.6996 102.908 84.7697 102.908"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M73.2607 91.2918C73.2607 91.2918 74.3733 89.3246 75.3738 88.4555C76.3783 87.5864 77.1857 87.1519 77.1857 87.1519"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M108.297 82.8454C108.297 82.8454 106.435 80.2303 106.061 76.7383"
          stroke="#2F7EFF"
          stroke-width="0.77"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
};

export const SingleAction: Story = {
  args: {
    title: "Task Completed",
    variant: "info",
    content: (
      <Typography component="p" variant="bodySRegular" color="neutral/60">
        Your task has been completed successfully!
      </Typography>
    ),
    actions: [
      <Button key="close" variant="contained" fullWidth>
        Close
      </Button>,
    ],
  },
};

export const MultipleActions: Story = {
  args: {
    title: "Choose an Option",
    variant: "alert",
    content: (
      <Typography component="p" variant="bodySRegular" color="neutral/60">
        Please select one of the following options to continue:
      </Typography>
    ),
    actions: [
      <Button key="option1" variant="outlined" color="neutral" fullWidth>
        Option 1
      </Button>,
      <Button key="option2" variant="outlined" color="neutral" fullWidth>
        Option 2
      </Button>,
      <Button key="option3" variant="contained" fullWidth>
        Option 3
      </Button>,
    ],
  },
};

export const LongContent: Story = {
  args: {
    title: "Terms and Conditions",
    variant: "info",
    content: (
      <div>
        <Typography
          component="p"
          variant="bodySRegular"
          color="neutral/60"
          style={{ marginBottom: "16px" }}
        >
          Lorem ipsum dolor sit amet consectetur. Varius amet tincidunt porta
          nibh arcu. Vitae nunc consequat malesuada orci quam sed fusce. Amet
          amet amet diam erat eu id natoque enim tellus. Elit sapien tincidunt
          consectetur tristique imperdiet elementum morbi volutpat.
        </Typography>
        <Typography
          component="p"
          variant="bodySRegular"
          color="neutral/60"
          style={{ marginBottom: "16px" }}
        >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </Typography>
        <Typography component="p" variant="bodySRegular" color="neutral/60">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </Typography>
      </div>
    ),
    actions: [
      <Button key="decline" color="neutral" variant="outlined" fullWidth>
        Decline
      </Button>,
      <Button key="accept" variant="contained" fullWidth>
        Accept
      </Button>,
    ],
  },
};

export const ErrorDialog: Story = {
  args: {
    title: "Error Occurred",
    variant: "alert",
    content: (
      <Typography component="p" variant="bodySRegular" color="critical/60">
        An unexpected error has occurred. Please try again or contact support if
        the problem persists.
      </Typography>
    ),
    actions: [
      <Button key="contact" color="neutral" variant="outlined" fullWidth>
        Contact Support
      </Button>,
      <Button key="retry" variant="contained" color="error" fullWidth>
        Try Again
      </Button>,
    ],
  },
};

export const SuccessDialog: Story = {
  args: {
    title: "Success!",
    variant: "info",
    content: (
      <Typography component="p" variant="bodySRegular" color="success/60">
        Your changes have been saved successfully. You can now continue with
        your workflow.
      </Typography>
    ),
    actions: [
      <Button
        key="continue"
        variant="contained"
        color="success"
      >
        Continue
      </Button>,
    ],
  },
};
