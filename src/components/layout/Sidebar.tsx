type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className="sideBar" data-testid="sidebar">
        <ul className="sidebar_generic">
            <li>  Inbox</li>
            <li>  Today</li>
            <li>  Next 7 days</li>
        </ul>
    </div>
  )
}

export default Sidebar