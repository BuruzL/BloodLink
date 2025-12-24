import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import BloodBadge from "../components/BloodBadge.jsx";
import { BellRing, CheckCircle2, XCircle, PhoneCall, Users } from "lucide-react";

function mockCandidates(blood) {
  return [
    { id: "d1", name: "Rafi", bloodGroup: blood, status: "PENDING", phoneMasked: "01***1234" },
    { id: "d2", name: "Nusrat", bloodGroup: blood, status: "ACCEPTED", phoneMasked: "01***8841" },
    { id: "d3", name: "Sabbir", bloodGroup: blood, status: "DECLINED", phoneMasked: "01***2290" },
  ];
}

export default function RequestDetail() {
  const { id } = useParams();
  const loc = useLocation();
  const nav = useNavigate();

  const [request, setRequest] = useState(loc.state?.request || null);
  const [candidates, setCandidates] = useState([]);
  const [broadcasted, setBroadcasted] = useState(false);

  useEffect(() => {
    // If user opened directly, create a demo request.
    if (!request) {
      setRequest({
        patientBlood: "A+",
        hospital: "Dhaka Medical",
        cause: "Accident",
        neededWhen: "Urgent",
        units: 1,
        note: "Demo request",
        location: "Dhanmondi",
        radiusKm: 10,
      });
    }
  }, [request]);

  useEffect(() => {
    if (request) setCandidates(mockCandidates(request.patientBlood));
  }, [request]);

  const stats = useMemo(() => {
    const accepted = candidates.filter((c) => c.status === "ACCEPTED").length;
    const declined = candidates.filter((c) => c.status === "DECLINED").length;
    const pending = candidates.filter((c) => c.status === "PENDING").length;
    return { accepted, declined, pending, total: candidates.length };
  }, [candidates]);

  const broadcast = () => {
    setBroadcasted(true);
    toast.success("Broadcast sent to matched donors (demo)");
  };

  const callDonor = (d) => {
    toast(`Call: ${d.phoneMasked} (demo)`);
  };

  return (
    <div className="container">
      <div className="rowBetween">
        <div>
          <h2>Request #{id.slice(0, 6)}</h2>
          <div className="muted">
            Hospital: <b>{request?.hospital}</b> • Location: <b>{request?.location}</b>
          </div>
        </div>
        <div className="rowGap">
          <button className="btnGhost" onClick={() => nav("/search", { state: { preset: request } })}>
            <Users size={16} /> View matches
          </button>
          <button className="btn" onClick={broadcast}>
            <BellRing size={16} /> {broadcasted ? "Broadcasted" : "Broadcast now"}
          </button>
        </div>
      </div>

      <div className="grid3 mt16">
        <div className="card">
          <div className="muted small">Blood needed</div>
          <div className="cardTitle"><BloodBadge group={request?.patientBlood} /></div>
          <div className="muted small">{request?.units} unit(s) • {request?.neededWhen}</div>
        </div>
        <div className="card">
          <div className="muted small">Accepted</div>
          <div className="bigNum">{stats.accepted}</div>
          <div className="muted small">Ready donors</div>
        </div>
        <div className="card">
          <div className="muted small">Pending</div>
          <div className="bigNum">{stats.pending}</div>
          <div className="muted small">Awaiting responses</div>
        </div>
      </div>

      <div className="mt16">
        <h3>Donor responses</h3>
        <div className="card mt12">
          <div className="table">
            <div className="tHead">
              <div>Donor</div>
              <div>Status</div>
              <div>Contact</div>
            </div>

            {candidates.map((d) => (
              <div className="tRow" key={d.id}>
                <div className="rowGap">
                  <div className="avatar">{d.name.slice(0, 1)}</div>
                  <div>
                    <div className="cardTitle">{d.name}</div>
                    <div className="muted small">Blood: {d.bloodGroup}</div>
                  </div>
                </div>

                <div>
                  {d.status === "ACCEPTED" && <span className="pillOk"><CheckCircle2 size={14} /> Accepted</span>}
                  {d.status === "DECLINED" && <span className="pillBad"><XCircle size={14} /> Declined</span>}
                  {d.status === "PENDING" && <span className="pillStrong">Pending</span>}
                </div>

                <div className="rowGap">
                  <span className="muted small">{d.phoneMasked}</span>
                  <button className="btnGhost" onClick={() => callDonor(d)}>
                    <PhoneCall size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="muted small mt12">
            Backend idea: broadcast → create “candidate alerts” → donors respond → requester sees live updates via WebSocket.
          </div>
        </div>
      </div>
    </div>
  );
}
