export const formatDate = (timestamp) => {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}  

export const ORDER_BY = {'date': 'timestamp', 'like': 'voteScore','comments': 'commentCount'}