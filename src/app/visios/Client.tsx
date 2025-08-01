import { UpcomingVideoCall } from "@/components/common/DarkSessionCard";
import { HeaderClient } from "@/components/layout/header/HeaderClient";

export default function Client() {
  return (
    <div>
      <HeaderClient text="Mes Visios" />
      <div className="w-full">
        <h2>Visio à venir</h2>
        <UpcomingVideoCall
          date="Aujourd'hui"
          duration="45"
          profileImage="/assets/icons/pro2.png"
          name="Sarah Ellis"
          title="Mentoring mensuel"
          onViewDetails={() => {}}
          variant="dark"
          className="max-w-[324px] h-[184px]"
        />
        <h2>Prochaines visios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() => {}}
            variant="light"
            className="max-w-[375.11px] h-[184px]"
          />
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() => {}}
            variant="light"
            className="max-w-[375.11px] h-[184px]"
          />
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() => {}}
            variant="light"
            className="max-w-[375.11px] h-[184px]"
          />
        </div>
      </div>
    </div>
  );
}
