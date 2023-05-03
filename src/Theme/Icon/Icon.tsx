import * as React from "react"

import { View } from "native-base";

import Svg, { Circle, Rect, Path, G, Defs, ClipPath, Image, Pattern} from 'react-native-svg';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import IconIonicons from 'react-native-vector-icons/Ionicons';

import IconFoundation from 'react-native-vector-icons/Foundation';

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

export interface IIconProps {
    name: string;
    size: number; 
    color: string
}

import { type SvgProps } from 'react-native-svg';

export interface ISvgProps extends SvgProps {
    xmlns?: string;
    xmlnsXlink?: string;
    xmlSpace?: string;
    size: number;
    color: string;
}
//svgComp.tsx

export const Icon = (props: IIconProps) => {
    const { name, size, color } = props;
    let iconname = '';

    switch (name) {
        // FontCustom
        case 'home':
            return IconHome({ size, color });
        case 'money':
            return IconMoney({ size, color });
        case 'notification':
            return IconNotification({ size, color });
        case 'collection':
            return IconCollection({ size, color });
        case 'more':
            return IconMore({size, color})
        case 'findroute':
            return IconFindRoute({size, color})
        case 'magnifying':
            return IconMagnifying({size, color})
        case 'map':
            return IconMap({size, color})
        case 'vectorintro':
          return VectorIntro({ size, color })
        case 'google':
          return Google({ size, color })
        case 'facebook':
          return Facebook({size, color})
        default:
          // FontAwesome
          // case "left" || "right" || 'heart' || 'envelop':
          if (["left", "right", 'heart', 'envelop'].includes(name)) {
            if (name == "left") iconname = "chevron-left"
            else if (name == "right") iconname = "chevron-right"
            else if (name == "heart") iconname = "heart"
            else if (name == "envelop") iconname = "envelope-o"
            return <IconFontAwesome name={iconname} size={size} color={color} />;
          }
          
          // MaterialCommunityIcons
          // case 'busstop' || 'bus' || 'bell' || 'lock':
          if (['busstop', 'bus', 'bell', 'lock'].includes(name)) { 
            if (name == 'busstop') iconname = 'bus-stop-uncovered'
            else if (name == 'bus') iconname = 'bus-side'
            else if (name == 'bell') iconname = 'bell-circle'
            else if (name == 'lock') iconname = 'lock-outline'      
            
            return <IconMaterialCommunityIcons name={iconname} size={size} color={color} />;
          }


          // Ionicons
          // case 'person' || 'personthin' || 'close' || 'location' || 'eyeshow' || 'eye-notshow' || 'back':
          if (['person', 'personthin', 'close', 'location', 'eyeshow', 'eye-notshow', 'back'].includes(name)) { 
            if (name == 'person' || name == 'close') iconname = name
            else if (name == 'personthin') iconname = 'person-circle-outline'
            else if (name == 'location') iconname = 'location-outline'
            else if (name == 'eyeshow') iconname = 'ios-eye-outline'
            else if (name == 'eye-notshow') iconname = 'ios-eye-off-outline'
            else if (name == 'back') iconname = 'arrow-back'

            return <IconIonicons name={iconname} size={size} color={color} />;
          }
          
        
          // Foundation
          // case 'target':
          if (name == 'target') { 
            iconname = "target-two"
            return <IconFoundation name={iconname} size={size} color={color} />;
          }
          
          if (['full' || 'fullexit'].includes(name)) { 
            if (name == 'full') iconname = "fullscreen"
            else if (name == 'fullexit') iconname = "fullscreen-exit"
    
            return <IconMaterialIcons name={iconname} size={size} color={color} />;
          }
          return <></>


      }
}
  



const IconHome= (props: ISvgProps) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 22"
      xmlSpace="preserve"
          {...props}>
      <Path
      d="M8.79968 21V13.1067C8.79968 12.5093 8.79968 12.2106 8.91594 11.9824C9.0182 11.7817 9.18138 11.6185 9.38209 11.5163C9.61026 11.4 9.90896 11.4 10.5063 11.4H13.493C14.0904 11.4 14.3891 11.4 14.6173 11.5163C14.818 11.6185 14.9812 11.7817 15.0834 11.9824C15.1997 12.2106 15.1997 12.5093 15.1997 13.1067V21M1.33301 8.73333L10.9757 1.50133C11.3429 1.22593 11.5265 1.08822 11.7281 1.03514C11.9061 0.988286 12.0932 0.988286 12.2712 1.03514C12.4729 1.08822 12.6565 1.22593 13.0237 1.50133L22.6663 8.73333M3.46635 7.13333V17.5867C3.46635 18.7814 3.46635 19.3788 3.69887 19.8352C3.9034 20.2366 4.22975 20.5629 4.63117 20.7675C5.08751 21 5.6849 21 6.87968 21H17.1197C18.3145 21 18.9118 21 19.3682 20.7675C19.7696 20.5629 20.096 20.2366 20.3005 19.8352C20.533 19.3788 20.533 18.7814 20.533 17.5867V7.13333L14.0477 2.26933C13.3133 1.71852 12.9461 1.44311 12.5428 1.33695C12.1868 1.24324 11.8126 1.24324 11.4566 1.33695C11.0533 1.44311 10.6861 1.71852 9.95168 2.26933L3.46635 7.13333Z"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
  />
    </Svg>
  );
  

const IconNotification = (props: ISvgProps) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox={`0 0 20 20`}
    xmlSpace="preserve"
        {...props}>
    <Path
        d="M16.2996 6.4C17.7908 6.4 18.9996 5.19117 18.9996 3.7C18.9996 2.20884 17.7908 1 16.2996 1C14.8084 1 13.5996 2.20884 13.5996 3.7C13.5996 5.19117 14.8084 6.4 16.2996 6.4Z"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    <Path
        d="M5.5 10.8999H10"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    <Path
        d="M5.5 14.5H13.6"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    <Path
        d="M11.8 1H7.3C2.8 1 1 2.8 1 7.3V12.7C1 17.2 2.8 19 7.3 19H12.7C17.2 19 19 17.2 19 12.7V8.2"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
  </Svg>
      
);
  
const IconCollection = (props: ISvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 22 20"
        xmlSpace="preserve"
        {...props}
    >
      <Path
        d="M19.5 6V14.2C19.5 15.8802 19.5 16.7202 19.173 17.362C18.8854 17.9265 18.4265 18.3854 17.862 18.673C17.2202 19 16.3802 19 14.7 19H7.3C5.61984 19 4.77976 19 4.13803 18.673C3.57354 18.3854 3.1146 17.9265 2.82698 17.362C2.5 16.7202 2.5 15.8802 2.5 14.2V6M2.6 1H19.4C19.9601 1 20.2401 1 20.454 1.10899C20.6422 1.20487 20.7951 1.35785 20.891 1.54601C21 1.75992 21 2.03995 21 2.6V4.4C21 4.96005 21 5.24008 20.891 5.45399C20.7951 5.64215 20.6422 5.79513 20.454 5.89101C20.2401 6 19.9601 6 19.4 6H2.6C2.03995 6 1.75992 6 1.54601 5.89101C1.35785 5.79513 1.20487 5.64215 1.10899 5.45399C1 5.24008 1 4.96005 1 4.4V2.6C1 2.03995 1 1.75992 1.10899 1.54601C1.20487 1.35785 1.35785 1.20487 1.54601 1.10899C1.75992 1 2.03995 1 2.6 1ZM8.6 9.5H13.4C13.9601 9.5 14.2401 9.5 14.454 9.60899C14.6422 9.70487 14.7951 9.85785 14.891 10.046C15 10.2599 15 10.5399 15 11.1V11.9C15 12.4601 15 12.7401 14.891 12.954C14.7951 13.1422 14.6422 13.2951 14.454 13.391C14.2401 13.5 13.9601 13.5 13.4 13.5H8.6C8.03995 13.5 7.75992 13.5 7.54601 13.391C7.35785 13.2951 7.20487 13.1422 7.10899 12.954C7 12.7401 7 12.4601 7 11.9V11.1C7 10.5399 7 10.2599 7.10899 10.046C7.20487 9.85785 7.35785 9.70487 7.54601 9.60899C7.75992 9.5 8.03995 9.5 8.6 9.5Z"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
);
  
const IconMoney = (props: ISvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 26 18"
        xmlSpace="preserve"
        {...props}
    >
      <Path
        d="M15.2856 5.57143H12.4284C11.4817 5.57143 10.7141 6.33894 10.7141 7.28571C10.7141 8.23249 11.4817 9 12.4284 9H13.5713C14.5181 9 15.2856 9.76751 15.2856 10.7143C15.2856 11.6611 14.5181 12.4286 13.5713 12.4286H10.7141M12.9999 4.42857V5.57143M12.9999 12.4286V13.5714M19.857 9H19.8684M6.14272 9H6.15415M1.57129 4.65714L1.57129 13.3429C1.57129 14.623 1.57129 15.263 1.82042 15.752C2.03956 16.1821 2.38923 16.5317 2.81931 16.7509C3.30825 17 3.94831 17 5.22843 17L20.7713 17C22.0514 17 22.6915 17 23.1804 16.7509C23.6105 16.5317 23.9602 16.1821 24.1793 15.752C24.4284 15.263 24.4284 14.623 24.4284 13.3429V4.65714C24.4284 3.37702 24.4284 2.73696 24.1793 2.24802C23.9602 1.81794 23.6105 1.46827 23.1804 1.24913C22.6915 1 22.0514 1 20.7713 1L5.22843 1C3.94831 1 3.30825 1 2.81931 1.24913C2.38923 1.46827 2.03956 1.81794 1.82042 2.24802C1.57129 2.73696 1.57129 3.37702 1.57129 4.65714ZM20.4284 9C20.4284 9.31559 20.1726 9.57143 19.857 9.57143C19.5414 9.57143 19.2856 9.31559 19.2856 9C19.2856 8.68441 19.5414 8.42857 19.857 8.42857C20.1726 8.42857 20.4284 8.68441 20.4284 9ZM6.71415 9C6.71415 9.31559 6.45831 9.57143 6.14272 9.57143C5.82713 9.57143 5.57129 9.31559 5.57129 9C5.57129 8.68441 5.82713 8.42857 6.14272 8.42857C6.45831 8.42857 6.71415 8.68441 6.71415 9Z"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
  

const IconMore = (props: ISvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 20 20"
        xmlSpace="preserve"
        {...props}
    >
      <Circle cx={10} cy={10} r={9} stroke={props.color} strokeWidth={2} />
      <G>
        <G>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0001 10.6946C10.3836 10.6946 10.6946 10.3836 10.6946 10.0001C10.6946 9.61658 10.3836 9.30566 10.0001 9.30566C9.61658 9.30566 9.30566 9.61658 9.30566 10.0001C9.30566 10.3836 9.61658 10.6946 10.0001 10.6946Z"
            stroke={props.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.8614 10.6946C15.245 10.6946 15.5559 10.3836 15.5559 10.0001C15.5559 9.61658 15.245 9.30566 14.8614 9.30566C14.4779 9.30566 14.167 9.61658 14.167 10.0001C14.167 10.3836 14.4779 10.6946 14.8614 10.6946Z"
            stroke={props.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.13878 10.6946C5.52231 10.6946 5.83322 10.3836 5.83322 10.0001C5.83322 9.61658 5.52231 9.30566 5.13878 9.30566C4.75525 9.30566 4.44434 9.61658 4.44434 10.0001C4.44434 10.3836 4.75525 10.6946 5.13878 10.6946Z"
            stroke={props.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </G>
    </Svg>
);
  
const IconFindRoute = (props: ISvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 22 22"
        xmlSpace="preserve"
        {...props}
    >
      <Path
        d="M19.5 1H2.5C1.67157 1 1 1.67157 1 2.5V19.5C1 20.3284 1.67157 21 2.5 21H19.5C20.3284 21 21 20.3284 21 19.5V2.5C21 1.67157 20.3284 1 19.5 1Z"
        fill={props.color}
        stroke='black'
        strokeLinejoin="round"
      />
      <Path
        d="M5 18L17.5 13"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1.46 4.39"
      />
      <Path
        d="M6 14.5C7.33333 12.5697 8 11.2364 8 10.5C8 9.39543 7.10457 8.5 6 8.5C4.89543 8.5 4 9.39543 4 10.5C4 11.2364 4.66667 12.5697 6 14.5Z"
        fill={props.color}
        stroke="white"
        strokeLinejoin="round"
      />
      <Path
        d="M16 10C17.3333 8.06971 18 6.73638 18 6C18 4.89543 17.1046 4 16 4C14.8954 4 14 4.89543 14 6C14 6.73638 14.6667 8.06971 16 10Z"
        fill={props.color}
        stroke="white"
        strokeLinejoin="round"
      />
    </Svg>
);
  
const IconMagnifying = (props: ISvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 20 20"
        xmlSpace="preserve"
        {...props}
    >
      <Path
        d="M10.0169 19.0337C14.9967 19.0337 19.0337 14.9967 19.0337 10.0169C19.0337 5.03701 14.9967 1 10.0169 1C5.03701 1 1 5.03701 1 10.0169C1 14.9967 5.03701 19.0337 10.0169 19.0337Z"
        fill={props.color}
        stroke='black'
        strokeLinejoin="round"
      />
      <G>
        <Path
          d="M13.0174 6.48595C12.2496 5.71809 11.1888 5.24316 10.017 5.24316C8.84533 5.24316 7.78452 5.71809 7.0166 6.48595"
          fill={props.color}
        />
        <Path
          d="M13.0174 6.48595C12.2496 5.71809 11.1888 5.24316 10.017 5.24316C8.84533 5.24316 7.78452 5.71809 7.0166 6.48595"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <G>
        <Path d="M16.499 16.4995L20.9997 21.0001L16.499 16.4995Z" fill="black"/>
        <Path
          d="M16.499 16.4995L20.9997 21.0001"
          stroke='black'
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );

const IconMap = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 20 20"
    xmlSpace="preserve"
    {...props}
  >
    <G>
      <G>
        <Path
          d="M7.14739 5.48828C6.58743 5.48828 6.14746 5.9383 6.14746 6.48833C6.14746 7.03835 6.59743 7.48837 7.14739 7.48837C7.69735 7.48837 8.14727 7.03835 8.14727 6.48833C8.14727 5.9383 7.69735 5.48828 7.14739 5.48828Z"
          fill="black"
        />
        <Path
          d="M19.4586 3.04014C18.6186 1.09005 16.7688 0 14.189 0H5.80958C2.59981 0 0 2.60012 0 5.81027V14.1907C0 16.7708 1.08992 18.6209 3.03978 19.4609C3.22976 19.5409 3.44975 19.4909 3.58974 19.3509L19.3486 3.59017C19.4986 3.44016 19.5486 3.22015 19.4586 3.04014ZM8.52938 10.2405C8.1394 10.6205 7.62944 10.8005 7.11948 10.8005C6.60952 10.8005 6.09955 10.6105 5.70958 10.2405C4.68966 9.28043 3.56974 7.75036 3.99971 5.93027C4.37968 4.2802 5.83957 3.54016 7.11948 3.54016C8.39939 3.54016 9.85928 4.2802 10.2393 5.94027C10.6592 7.75036 9.5393 9.28043 8.52938 10.2405Z"
          fill="black"
        />
        <Path
          d="M17.468 18.5303C17.688 18.7503 17.658 19.1103 17.388 19.2603C16.5081 19.7503 15.4382 20.0003 14.1883 20.0003H5.8089C5.51892 20.0003 5.39893 19.6603 5.59891 19.4603L11.6385 13.42C11.8384 13.22 12.1484 13.22 12.3484 13.42L17.468 18.5303Z"
          fill="black"
        />
        <Path
          d="M19.9993 5.80893V14.1893C19.9993 15.4394 19.7493 16.5194 19.2593 17.3894C19.1093 17.6595 18.7494 17.6795 18.5294 17.4695L13.4098 12.3492C13.2098 12.1492 13.2098 11.8392 13.4098 11.6392L19.4493 5.59892C19.6593 5.39892 19.9993 5.51892 19.9993 5.80893Z"
          fill="black"
        />
      </G>
    </G>
  </Svg>
);
const VectorIntro = (props: ISvgProps) => (
  <View style={{position:'absolute'}}>
    <Svg
      width={560}
      height={320}
      viewBox="0 0 1681 960"
      fill="red"
    >
      <Path
      d="M879.037 5.04182C745.039 -15.1158 676.227 40.7187 245.823 159.245L1 633.958C387.88 845.109 767.204 958.999 1036.21 958.999C1213.23 958.999 1660.35 674.777 1680 479.752L1537.94 159.245L879.037 5.04182Z"
      fill="white"
      stroke="white"
      />
    </Svg>
  </View>
);

const Google = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 20 20"
    xmlSpace="preserve"
    {...props}
    // width={props.size}
    // height={props.size}
    // viewBox="0 0 20 20"
    // fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    // {...props}
  >
    <G clipPath="url(#clip0_317_21007)">
      <Path
        d="M19.9895 10.1858C19.9895 9.36645 19.9214 8.76851 19.7742 8.14844H10.1992V11.8468H15.8195C15.7062 12.7658 15.0943 14.15 13.7346 15.08L13.7155 15.2038L16.7429 17.4957L16.9527 17.5161C18.8789 15.7777 19.9895 13.2198 19.9895 10.1858"
        fill="#4285F4"
      />
      <Path
        d="M10.1993 19.9322C12.9527 19.9322 15.2643 19.0463 16.9527 17.5183L13.7346 15.0822C12.8734 15.669 11.7176 16.0787 10.1993 16.0787C7.50242 16.0787 5.21352 14.3403 4.39759 11.9375L4.27799 11.9474L1.13003 14.3281L1.08887 14.4399C2.76588 17.6954 6.2106 19.9322 10.1993 19.9322Z"
        fill="#34A853"
      />
      <Path
        d="M4.39748 11.9383C4.18219 11.3182 4.05759 10.6538 4.05759 9.9673C4.05759 9.28073 4.18219 8.61638 4.38615 7.9963L4.38045 7.86424L1.19304 5.44531L1.08876 5.49379C0.397576 6.8447 0.000976562 8.36172 0.000976562 9.9673C0.000976562 11.5729 0.397576 13.0898 1.08876 14.4407L4.39748 11.9383"
        fill="#FBBC05"
      />
      <Path
        d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.21061 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99465C5.21352 5.59183 7.50243 3.85336 10.1993 3.85336"
        fill="#EB4335"
      />
    </G>
    <Defs>
      <ClipPath>
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
)

const Facebook = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 20 20"
    xmlSpace="preserve"
    {...props}
>
  <Path
    d="M9.99999 20C15.5228 20 20 15.5228 20 9.99999C20 4.47715 15.5228 0 9.99999 0C4.47715 0 0 4.47715 0 9.99999C0 15.5228 4.47715 20 9.99999 20Z"
    fill="#1977F3"
  />
  <Path
    d="M13.8921 12.8923L14.3351 10.001H11.5619V8.12506C11.5619 7.33474 11.9486 6.5627 13.1918 6.5627H14.4532V4.10172C14.4532 4.10172 13.3085 3.90625 12.2144 3.90625C9.93064 3.90625 8.43718 5.29002 8.43718 7.7974V10.001H5.89746V12.8923H8.43718V19.8801C8.94625 19.9602 9.46798 20.001 9.99955 20.001C10.5311 20.001 11.0528 19.9588 11.5619 19.8801V12.8923H13.8921Z"
    fill="white"
  />
</Svg>
)