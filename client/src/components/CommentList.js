export const CommentList = ({ comments }) => {
  
  const renderComments = () => {
    return comments.map((v) => {
      switch (v.status) {
        case 'approved':
          break;
        case 'rejected':
          v.content = 'This comment is rejected';
          break;
        case 'pending':
          v.content = 'This comment is on pending';
          break;
        default:
          break;
      }
      return (<li key={v.id}>{v.content}</li>);
    });
  }
  
  return (
    <ul>
      {renderComments()}
    </ul>
  )
}