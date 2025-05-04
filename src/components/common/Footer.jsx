import {
  Footer as FooterParent,
  FooterBrand,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
  FooterCopyright,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import flowbit from "../../config/flowbit";

export default function Footer() {
  return (
    <div className="">
      <div className="">
        <FooterParent theme={flowbit.footer} className="py-10 px-5" bgDark>
          <div className="w-full container ">
            <div className="w-full justify-between md:flex md:grid-cols-1">
              <div className="flex gap-4 items-center justify-center mb-10 ">
                <img className="w-12" src="/logo.png" alt="Logo" />
                <h1 className="text-lg font-bold text-primaryColor">شفائك</h1>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:mt-4 lg:grid-cols-3 sm:gap-6 text-whiteColor">
                <div>
                  <FooterTitle title="حول" className="text-gray-200 text-lg" />
                  <FooterLinkGroup col>
                    <FooterLink className="text-gray-300" href="#">
                      شفائك
                    </FooterLink>
                    <FooterLink className="text-gray-300" href="#">
                      سياساتنا
                    </FooterLink>
                  </FooterLinkGroup>
                </div>
                <div>
                  <FooterTitle
                    title="تابعونا"
                    className="text-gray-200 text-lg"
                  />
                  <FooterLinkGroup col>
                    <FooterLink className="text-gray-300" href="#">
                      فيسبوك
                    </FooterLink>
                    <FooterLink className="text-gray-300" href="#">
                      انستاغرام
                    </FooterLink>
                  </FooterLinkGroup>
                </div>
                <div>
                  <FooterTitle
                    title="القوانين"
                    className="text-gray-200 text-lg"
                  />
                  <FooterLinkGroup col>
                    <FooterLink className="text-gray-300" href="#">
                      سياسة الخصوصية
                    </FooterLink>
                    <FooterLink className="text-gray-300" href="#">
                      القواعد والارشادات
                    </FooterLink>
                  </FooterLinkGroup>
                </div>
              </div>
            </div>
            <FooterDivider />
            <div className="w-full flex justify-between items-center">
              <FooterCopyright
                className="text-gray-300"
                href="#"
                by="كل الحقوق محفوظة لشفائك "
                year={2025}
              />
              <div className="flex items-center gap-3">
                <FooterIcon
                  className="text-gray-300"
                  href="#"
                  icon={BsFacebook}
                />
                <FooterIcon
                  className="text-gray-300"
                  href="#"
                  icon={BsInstagram}
                />
                <FooterIcon
                  className="text-gray-300"
                  href="#"
                  icon={BsTwitter}
                />
              </div>
            </div>
          </div>
        </FooterParent>
      </div>
    </div>
  );
}
