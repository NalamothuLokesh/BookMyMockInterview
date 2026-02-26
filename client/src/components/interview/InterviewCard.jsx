export default function InterviewCard({ interview }) {
  return (
    <div className="interview-card">
      <h3>{interview.title}</h3>
      <p>{interview.description}</p>
    </div>
  );
}
