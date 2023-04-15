import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import AWS from 'aws-sdk'
import { Buffer } from 'buffer'
import NavBar from '../componrnts/navs/NavStudent'
import { Select } from 'antd'

const LaunchEC2Instance = () => {
  const [publicIpAddress, setPublicIpAddress] = useState('')
  const [instanceId, setInstanceId] = useState('')
  const [launchClicked, setLaunchClicked] = useState(false)
  // Configure the AWS SDK with your access keys
  AWS.config.update({
    accessKeyId: 'XXXX',
    secretAccessKey: 'XXX',
    region: 'us-east-1' // Replace with your desired region
  })
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [intervalId, setIntervalId] = useState(null)
  const [instanceState, setInstanceState] = useState('terminated')
  const [userData, setUserData] = useState('')

  const [timerText, setTimerText] = useState('')

  const startTimer = () => {
    setIsRunning(true)
    intervalId = setIntervalId(() => {
      setTimer(timer => timer + 1000)
    }, 1000)
  }

  const stopTimer = () => {
    setIsRunning(false)
    clearInterval(intervalId)
  }

  const resetTimer = () => {
    setTimer(0)
    stopTimer()
  }

  const totalSeconds = Math.floor(timer / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const options = [
    {
      value: 'citizenstig/dvwa',
      label: 'citizenstig/dvwa',
      commands:
        '#!/bin/bash\napt-get update -y\napt-get install -y docker.io\nsystemctl start docker\n docker pull citizenstig/dvwa && docker run -d -p 80:80 citizenstig/dvwa'
    },
    {
      value: 'vulnerables/web-dvwa',
      label: 'vulnerables/web-dvwa',
      commands:
        '#!/bin/bash\napt-get update -y\napt-get install -y docker.io\nsystemctl start docker\n docker run --rm -it -p 80:80 vulnerables/web-dvwa'
    },
    {
      value: 'citizenstig/nowasp',
      label: 'citizenstig/nowasp',
      commands:
        '#!/bin/bash\napt-get update -y\napt-get install -y docker.io\nsystemctl start docker\n docker pull citizenstig/nowasp && docker run -d -p 80:80 citizenstig/nowasp'
    },
    {
      value: 'bkimminich/juice-shop',
      label: 'bkimminich/juice-shop',
      commands:
        '#!/bin/bash\napt-get update -y\napt-get install -y docker.io\nsystemctl start docker\n docker pull bkimminich/juice-shop && docker run -d -p 80:3000 bkimminich/juice-shop'
    }
  ]

  const [selectedInstanceType, setSelectedInstanceType] = useState(
    options[1].value
  )
  // const userData = `#!/bin/bash
  // apt-get update -y
  // apt-get install -y docker.io
  // systemctl start docker
  // docker pull bkimminich/juice-shop
  // docker run -d -p 80:3000 bkimminich/juice-shop
  // `

  const handleInstanceTypeChange = value => {
    if (value === 'bkimminich/juice-shop') {
      setUserData(options[3].commands)
      // userData = options[3].commands
    } else if (value === 'citizenstig/nowasp') {
      setUserData(options[2].commands)
      //userData = options[2].commands
    } else if (value === 'vulnerables/web-dvwa') {
      setUserData(options[1].commands)
      //userData = options[1].commands
    } else if (value === 'citizenstig/dvwa') {
      setUserData(options[0].commands)
      //userData = options[0].commands
    }
  }
  useEffect(() => {
    setTimerText(`${hours} hours, ${minutes} minutes, ${seconds} seconds`)

    const ec2 = new AWS.EC2()
    const params = {
      Filters: [{ Name: 'instance-state-name', Values: ['running'] }]
    }
    ec2.describeInstances(params, (err, data) => {
      if (err) {
        console.error('Error describing instances:', err)
      } else {
        const instances = data.Reservations.reduce(
          (acc, cur) => acc.concat(cur.Instances),
          []
        )
        if (instances.length > 0) {
          const instance = instances[0]
          const publicIpAddress = instance.PublicIpAddress
          setPublicIpAddress(publicIpAddress)
          setInstanceId(instance.InstanceId)
        }
      }
    })
  }, [hours, minutes, seconds])

  const launchInstance = () => {
    setLaunchClicked(true)

    const ec2 = new AWS.EC2()

    const encodedUserData = Buffer.from(userData).toString('base64')
    const params = {
      ImageId: 'ami-007855ac798b5175e', // Replace with your desired AMI ID
      InstanceType: 't2.micro',
      KeyName: 'sshKeyPair', // Replace with your desired key pair name
      MinCount: 1,
      MaxCount: 1,
      SecurityGroups: ['launch-wizard-1'], // Replace with your desired security group name(s)
      //UserData: `#cloud-config\n\nruncmd:\n  - echo "Hello, World!"`, // Replace with your desired user data script
      UserData: encodedUserData
    }

    //Make variable for instance State

    ec2.runInstances(params, (err, data) => {
      if (err) {
        console.error('Error launching EC2 instance:', err)
      } else {
        const instanceId = data.Instances[0].InstanceId
        console.log('Launched EC2 instance:', instanceId)
        setInstanceId(instanceId)

        // Wait for instance to be in running state
        const waitForInstanceStateParams = {
          InstanceIds: [instanceId],
          Filters: [{ Name: 'instance-state-name', Values: ['running'] }]
        }

        ec2.waitFor(
          'instanceRunning',
          waitForInstanceStateParams,
          (err, data) => {
            if (err) {
              console.error(
                'Error waiting for EC2 instance to be in running state:',
                err
              )
            } else {
              const publicIpAddress =
                data.Reservations[0].Instances[0].PublicIpAddress
              console.log('Public IP address:', publicIpAddress)
              setPublicIpAddress(publicIpAddress)
              setInstanceState('running')
              startTimer()
            }
          }
        )
      }
    })
  }

  const stopInstance = () => {
    setLaunchClicked(false)
    const ec2 = new AWS.EC2()
    const params = {
      InstanceIds: [instanceId]
    }
    ec2.stopInstances(params, (err, data) => {
      if (err) {
        console.error('Error stopping EC2 instance:', err)
      } else {
        console.log('Stopped EC2 instance:', instanceId)
        setInstanceState('stopped')
        stopTimer()
        //setPublicIpAddress('');
        //setInstanceId('');
      }
    })
  }

  const terminateInstance = () => {
    setLaunchClicked(false)
    const ec2 = new AWS.EC2()
    const params = {
      InstanceIds: [instanceId]
    }
    ec2.terminateInstances(params, (err, data) => {
      if (err) {
        console.error('Error terminating EC2 instance:', err)
      } else {
        console.log('Terminated EC2 instance:', instanceId)
        setPublicIpAddress('')
        setInstanceId('')
        setInstanceState('terminated')
        resetTimer()
      }
    })
  }

  const resumeInstance = () => {
    const ec2 = new AWS.EC2()
    const params = {
      InstanceIds: [instanceId]
    }
    ec2.startInstances(params, (err, data) => {
      if (err) {
        console.error('Error resuming EC2 instance:', err)
      } else {
        console.log('Resumed EC2 instance:', instanceId)
        setInstanceState('running')
        startTimer()
      }
    })
  }

  return (
    <>
      <NavBar />
      <div className='body'>
        <div className='container'>
          <h1 style={{ color: '#16df70' }}>Lab</h1>
          {publicIpAddress ? (
            <div>
              <p>
                Public IP address:{' '}
                <a href={`http://${publicIpAddress}`}>{publicIpAddress}</a>
              </p>
              <p>
                Timer: <div id='timer'>{timerText}</div>
              </p>
              <div className='button-group'>
                {instanceState !== 'stopped' ? (
                  <button onClick={stopInstance} className='button'>
                    Pause Instance
                  </button>
                ) : (
                  <button onClick={resumeInstance} className='button'>
                    Resume Instance
                  </button>
                )}
                <button onClick={terminateInstance} className='button'>
                  Terminate Instance
                </button>
              </div>
            </div>
          ) : (
            <div>
              {launchClicked ? (
                <button className='button'>Loading Instance</button>
              ) : (
                <>
                  <div className='select-container'>
                    <h2>Select the lab:</h2>

                    <br />
                    <Select
                      defaultValue={selectedInstanceType}
                      onChange={handleInstanceTypeChange}
                    >
                      {options.map(option => (
                        <Select.Option key={option.value} value={option.value}>
                          {option.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  <br />
                  <button onClick={launchInstance} className='button'>
                    Launch Instance
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default LaunchEC2Instance
