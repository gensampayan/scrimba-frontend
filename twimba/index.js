    import { tweetsData as twimbasData } from './data.js'
    import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

    let tweetsData = []

    if(localStorage.getItem('tweetsData')){
        retrieveFromLocalStorage()
    } else {
        localStorage.setItem('tweetsData', JSON.stringify(twimbasData))
        tweetsData = twimbasData
    }

    document.addEventListener('click', function(e){
        if(e.target.id === 'tweet-btn'){
            handleTweetBtnClick()
        }
        else if(e.target.dataset.like){
           handleLikeClick(e.target.dataset.like) 
        }
        else if(e.target.dataset.retweet){
            handleRetweetClick(e.target.dataset.retweet)
        }
        else if(e.target.dataset.reply){
            toggleReplyClick(e.target.dataset.reply)
        }
        else if(e.target.dataset.replied){
            handleReplyClick(e.target.dataset.replied)
        }
        else if(e.target.dataset.delete){
            handleRemoveTweet(e.target.dataset.delete)
        }
        else if(e.target.dataset.remove){
            handleRemoveReply(e.target.dataset.remove)
        }
    })

    function handleTweetBtnClick(){
        const tweetInput = document.getElementById('tweet-input')

        if(tweetInput.value){
            tweetsData.unshift({
                handle: `@Scrimba`,
                profilePic: `images/scrimbalogo.png`,
                likes: 0,
                retweets: 0,
                tweetText: tweetInput.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
            })
        storeToLocalStorage()
        render()
        tweetInput.value = ''
        }
    }

    function handleReplyClick(tweetId){
        const targetTweetObj = tweetsData.filter(function(tweet){
            return tweet.uuid === tweetId
        })[0]
        const replyInput = document.getElementById(`reply-input-${tweetId}`)
    
        if(replyInput.value){
            targetTweetObj.replies.unshift({
                handle: `@Scrimba`,
                profilePic: `images/scrimbalogo.png`,
                tweetText: replyInput.value
            })
            storeToLocalStorage()
            render();
            replyInput.value = ''
        }
    }

    function toggleReplyClick(replyId){
        document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
    }
    
    function handleLikeClick(tweetId){ 
        const targetTweetObj = tweetsData.filter(function(tweet){
            return tweet.uuid === tweetId
        })[0]

        if(targetTweetObj.isLiked){
            targetTweetObj.likes--
        }
        else{
            targetTweetObj.likes++ 
        }
        targetTweetObj.isLiked = !targetTweetObj.isLiked
        storeToLocalStorage()
        render()
    }

    function handleRetweetClick(tweetId){
        const targetTweetObj = tweetsData.filter(function(tweet){
            return tweet.uuid === tweetId
        })[0]
        
        if(targetTweetObj.isRetweeted){
            targetTweetObj.retweets--
        }
        else{
            targetTweetObj.retweets++
        }
        targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
        storeToLocalStorage()
        render() 
    }
    
    function handleRemoveTweet(tweetId){
        const targetTweetIndex = tweetsData.findIndex(function(tweet){
            return tweet.uuid === tweetId
        })
    
        if(targetTweetIndex !== -1){
            tweetsData.splice(targetTweetIndex, 1)
            storeToLocalStorage()
            render()
        }
    }

    function handleRemoveReply(tweetId){
        const targetTweetIndex = tweetsData.findIndex(function(tweet){
            return tweet.uuid === tweetId
        })
    
        if(targetTweetIndex !== -1){
            tweetsData[targetTweetIndex].replies.splice(0, 1)
            storeToLocalStorage()
            render()
        }
    }    

    function getFeedHtml(){
        let feedHtml = ``
        
        tweetsData.forEach(function(tweet){
            let likeIconClass = ''
            if (tweet.isLiked){
                likeIconClass = 'liked'
            }
            
            let retweetIconClass = ''
            if (tweet.isRetweeted){
                retweetIconClass = 'retweeted'
            }

            let menuIconClass = ''
            if (tweet.isRemoved){
                menuIconClass = 'removed'
            }
            
            let repliesHtml = ''
            if(tweet.replies.length){
                tweet.replies.forEach(function(reply){
                    repliesHtml+=`
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                            <span class="tweet-menu">
                                <i class="fa-solid fa-trash ${menuIconClass}"
                                id="remove-input-${tweet.uuid}"
                                data-remove="${tweet.uuid}"
                                ></i>
                            </span>
                        </div>
                    </div>
                    `
                })
            }
            
            feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots"
                                data-reply="${tweet.uuid}"
                                ></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}"
                                data-like="${tweet.uuid}"
                                ></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}"
                                data-retweet="${tweet.uuid}"
                                ></i>
                                ${tweet.retweets}
                            </span>
                            <span class="tweet-menu">
                                <i class="fa-solid fa-trash ${menuIconClass}"
                                id="remove-input-${tweet.uuid}"
                                data-delete="${tweet.uuid}"
                                ></i>
                             </span>
                        </div>   
                    </div>            
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    <div class="reply-input-area">
                        <img src="images/scrimbalogo.png" class="reply-profile-pic">
                        <textarea class="reply-tweet-input" id="reply-input-${tweet.uuid}" type="text" placeholder="Post your reply!"></textarea>
                        <button class="reply-tweet-btn" data-replied="${tweet.uuid}">Reply</button>
                    </div>
                    ${repliesHtml}
                </div>   
            </div>
            `
        })
        return feedHtml 
    }

    function render(){
        document.getElementById('feed').innerHTML = getFeedHtml()
    }

    function storeToLocalStorage(){
        localStorage.setItem('tweetsData', JSON.stringify(tweetsData))
    }

    function retrieveFromLocalStorage(){
        tweetsData = JSON.parse(localStorage.getItem('tweetsData'))
    }

    render()