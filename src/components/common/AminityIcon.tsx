import {
  AirVent,
  AlarmSmoke,
  ArrowUpDown,
  Baby,
  Briefcase,
  CalendarClock,
  Cctv,
  CigaretteOff,
  CreditCard,
  Cross,
  Dumbbell,
  EggFried,
  FireExtinguisher,
  Globe,
  Heater,
  Luggage,
  ParkingCircle,
  ParkingSquare,
  Printer,
  Router,
  Space,
  Sparkles,
  Utensils,
  WashingMachine,
  Wifi,
} from 'lucide-react'

export const AminityIcon = ({ id }: { id: number }) => {
  return getIcons(id)
}

const getIcons = (iconId: number) =>
  ({
    '2': <ParkingCircle className="shrink-0 text-gray-100 size-5" />,
    '3': <Utensils className="shrink-0 text-gray-100 size-5" />,
    '8': <CalendarClock className="shrink-0 text-gray-100 size-5" />,
    '11': <Dumbbell className="shrink-0 text-gray-100 size-5" />,
    '16': <CigaretteOff className="shrink-0 text-gray-100 size-5" />,
    '20': <Briefcase className="shrink-0 text-gray-100 size-5" />,
    '22': <WashingMachine className="shrink-0 text-gray-100 size-5" />,
    '28': <Baby className="shrink-0 text-gray-100 size-5" />,
    '47': <Globe className="shrink-0 text-gray-100 size-5" />,
    '48': <ArrowUpDown className="shrink-0 text-gray-100 size-5" />,
    '80': <Heater className="shrink-0 text-gray-100 size-5" />,
    '81': <Printer className="shrink-0 text-gray-100 size-5" />,
    '91': <Luggage className="shrink-0 text-gray-100 size-5" />,
    '96': <Wifi className="shrink-0 text-gray-100 size-5" />,
    '107': <Wifi className="shrink-0 text-gray-100 size-5" />,
    '108': <CigaretteOff className="shrink-0 text-gray-100 size-5" />,
    '109': <AirVent className="shrink-0 text-gray-100 size-5" />,
    '115': <Utensils className="shrink-0 text-gray-100 size-5" />,
    '158': <Sparkles className="shrink-0 text-gray-100 size-5" />,
    '160': <ParkingSquare className="shrink-0 text-gray-100 size-5" />,
    '163': <Router className="shrink-0 text-gray-100 size-5" />,
    '255': <Dumbbell className="shrink-0 text-gray-100 size-5" />,
    '422': <AlarmSmoke className="shrink-0 text-gray-100 size-5" />,
    '423': <Cctv className="shrink-0 text-gray-100 size-5" />,
    '425': <FireExtinguisher className="shrink-0 text-gray-100 size-5" />,
    '453': <Space className="shrink-0 text-gray-100 size-5" />,
    '459': <Cross className="shrink-0 text-gray-100 size-5" />,
    '461': <CreditCard className="shrink-0 text-gray-100 size-5" />,
    '467': <Sparkles className="shrink-0 text-gray-100 size-5" />,
    '484': <EggFried className="shrink-0 text-gray-100 size-5" />,
  })[iconId]