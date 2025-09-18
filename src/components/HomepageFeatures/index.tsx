import Translate, { translate } from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({ message: "功能强大" }),
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        <Translate>
          10 余个功能模块，提供对恶意 IP/Peer 的全面检测，高度可定制。
        </Translate>
      </>
    ),
  },
  {
    title: translate({ message: "开箱即用" }),
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        <Translate>跟随教程从安装到配置，整个过程只需不到 20 分钟。</Translate>
      </>
    ),
  },
  {
    title: translate({ message: "兼容多种下载器" }),
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        <Translate>
          完全支持 qBittorrent, Transmission, BitComet 和 BiglyBT/Azuerus/Vuze。
        </Translate>
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
