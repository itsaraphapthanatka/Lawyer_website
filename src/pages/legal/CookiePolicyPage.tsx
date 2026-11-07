import { Link } from 'react-router-dom';
import LegalLayout, { ContactBlock, FIRM, List, Section } from './LegalLayout';

/**
 * เนื้อหาต้องตรงกับที่เว็บใช้จริง (ตรวจเมื่อ 7 พ.ย. 2569): ไม่มี analytics/pixel/โฆษณา · เว็บไม่ตั้งคุกกี้เอง
 * · localStorage ใช้เฉพาะหน้าผู้ดูแล (admin_token) · บุคคลภายนอก: Cloudflare, Google Maps (iframe หน้าแรก), Google Fonts
 * ถ้าเพิ่ม Google Analytics / Facebook Pixel / แชตวิดเจ็ต ต้องแก้หน้านี้และเพิ่มแบนเนอร์ขอความยินยอมก่อนเปิดใช้
 */
const CookiePolicyPage = () => (
  <LegalLayout
    path="/cookie-policy"
    title="นโยบายคุกกี้"
    description={`เว็บไซต์ ${FIRM} ใช้คุกกี้และเทคโนโลยีที่คล้ายกันอย่างไร: ไม่มีคุกกี้โฆษณาหรือติดตามพฤติกรรม มีเฉพาะที่จำเป็นและจากบริการแผนที่`}
  >
    <Section title="1. คุกกี้คืออะไร">
      <p>
        คุกกี้คือไฟล์ข้อความขนาดเล็กที่เว็บไซต์หรือบริการที่ฝังอยู่ในเว็บไซต์บันทึกไว้ในเบราว์เซอร์ของท่าน
        เพื่อให้เว็บไซต์ทำงานได้ จดจำการตั้งค่า หรือวัดการใช้งาน
        นโยบายนี้ใช้กับเทคโนโลยีที่คล้ายกันด้วย เช่น พื้นที่จัดเก็บในเบราว์เซอร์ (local storage)
      </p>
    </Section>

    <Section title="2. สรุปสั้น ๆ">
      <List items={[
        'เว็บไซต์นี้ไม่ใช้คุกกี้เพื่อการโฆษณา และไม่ใช้เครื่องมือวิเคราะห์หรือติดตามพฤติกรรมผู้ใช้',
        'ตัวเว็บไซต์เองไม่ได้ตั้งคุกกี้ให้ผู้เข้าชมทั่วไป',
        'คุกกี้ที่ท่านอาจพบมาจากระบบป้องกันเว็บไซต์ และจากแผนที่ Google Maps ที่ฝังอยู่ในหน้าแรก',
      ]} />
    </Section>

    <Section title="3. คุกกี้และเทคโนโลยีที่อาจถูกใช้">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-base border-collapse">
          <thead>
            <tr className="border-b border-white/20 text-white">
              <th className="py-3 pr-4">ประเภท</th>
              <th className="py-3 pr-4">มาจาก</th>
              <th className="py-3">ใช้ทำอะไร</th>
            </tr>
          </thead>
          <tbody className="align-top">
            <tr className="border-b border-white/10">
              <td className="py-3 pr-4 text-white">จำเป็น</td>
              <td className="py-3 pr-4">Cloudflare (ผู้ให้บริการป้องกันและเร่งความเร็วเว็บไซต์)</td>
              <td className="py-3">อาจตั้งคุกกี้ เช่น __cf_bm เพื่อแยกผู้ใช้จริงออกจากบอทและป้องกันการโจมตี ปิดไม่ได้เพราะจำเป็นต่อความปลอดภัย</td>
            </tr>
            <tr className="border-b border-white/10">
              <td className="py-3 pr-4 text-white">บุคคลภายนอก</td>
              <td className="py-3 pr-4">Google Maps (แผนที่ในหน้าแรก)</td>
              <td className="py-3">Google อาจตั้งคุกกี้เมื่อแผนที่โหลด ตามนโยบายของ Google เรามองไม่เห็นและไม่ได้รับข้อมูลจากคุกกี้เหล่านี้</td>
            </tr>
            <tr className="border-b border-white/10">
              <td className="py-3 pr-4 text-white">ไม่ใช่คุกกี้</td>
              <td className="py-3 pr-4">Google Fonts</td>
              <td className="py-3">เบราว์เซอร์ดาวน์โหลดฟอนต์จาก Google ซึ่งทำให้ Google ได้รับหมายเลข IP ของท่าน แต่ไม่ได้ตั้งคุกกี้</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 text-white">พื้นที่จัดเก็บในเบราว์เซอร์</td>
              <td className="py-3 pr-4">เว็บไซต์นี้ (เฉพาะผู้ดูแล)</td>
              <td className="py-3">จำสถานะการเข้าสู่ระบบของผู้ดูแลสำนักงานในหน้าหลังบ้านเท่านั้น ผู้เข้าชมทั่วไปไม่ถูกบันทึก</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        ดูรายละเอียดของผู้ให้บริการได้ที่{' '}
        <a className="text-secondary hover:underline" href="https://policies.google.com/technologies/cookies?hl=th" target="_blank" rel="noopener noreferrer">นโยบายคุกกี้ของ Google</a>{' '}
        และ{' '}
        <a className="text-secondary hover:underline" href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/" target="_blank" rel="noopener noreferrer">คุกกี้ของ Cloudflare</a>
      </p>
    </Section>

    <Section title="4. การจัดการคุกกี้">
      <p>
        ท่านลบหรือบล็อกคุกกี้ได้จากการตั้งค่าเบราว์เซอร์ เช่น Chrome, Safari, Firefox หรือ Edge
        การบล็อกคุกกี้ของบุคคลภายนอกอาจทำให้แผนที่ในหน้าแรกไม่แสดง แต่ส่วนอื่นของเว็บไซต์ รวมถึงแบบฟอร์มนัดหมาย ยังใช้งานได้ตามปกติ
      </p>
      <p>
        เนื่องจากเว็บไซต์ไม่ใช้คุกกี้เพื่อการวิเคราะห์หรือการโฆษณา จึงไม่มีแบนเนอร์ขอความยินยอม
        หากในอนาคตเราเริ่มใช้คุกกี้ประเภทดังกล่าว เราจะขอความยินยอมจากท่านก่อนและปรับปรุงนโยบายนี้
      </p>
    </Section>

    <Section title="5. ข้อมูลเพิ่มเติมและการติดต่อ">
      <p>
        การใช้ข้อมูลส่วนบุคคลโดยรวมดูได้ที่{' '}
        <Link to="/privacy-policy" className="text-secondary hover:underline">นโยบายความเป็นส่วนตัว</Link>
      </p>
      <ContactBlock />
    </Section>
  </LegalLayout>
);

export default CookiePolicyPage;
