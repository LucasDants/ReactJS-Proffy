import React, {FormEvent, useState} from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import { useHistory } from 'react-router-dom'
import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'
import api from '../../services/api';
function TeacherForm() {
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setwhatsapp] = useState("");
    const [bio, setBio] = useState("");
    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')
    const [scheduleItems, setSecheduleItems] = useState([{
        week_day: 0,
        from: '',
        to: ''
    }])
    const history = useHistory()

    function addNewScheduleItem () {
        setSecheduleItems([
            ...scheduleItems,
            {
            week_day: 0,
            from: '',
            to: ''
        }
        ])
    };

    function setSecheduleItemValue(position: number, field: string, value: string) {
        const newArray = scheduleItems.map((scheduleItem, index )=> {
            if(index === position) {
                return {...scheduleItem, [field]: value}
            }
            return scheduleItem
        })

        setSecheduleItems(newArray)
    }

    function handleCreateClass (event: FormEvent) {
        event.preventDefault()
        api.post("classes", {
          name,
          avatar,
          whatsapp,
          bio,
          subject,
          cost: Number(cost),
          schedule: scheduleItems,
        }).then(() => {
            alert('Cadastro realizado com sucesso')
            history.push('/')
        }).catch(err => {
            alert(err)
        })

    }

    return (
      <div id="page-teacher-form" className="container">
        <PageHeader
          title="Que incrível que você quer dar aulas."
          description="O primeiro passo é preencher esse formulário de inscrição"
        />
        <main>
            <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(event) => {
                setAvatar(event.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="whatsapp"
              value={whatsapp}
              onChange={(event) => {
                setwhatsapp(event.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(event) => {
                setBio(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(event) => {
                setSubject(event.target.value);
              }}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Matemática", label: "Matemática" },
                { value: "Física", label: "Física" },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(event) => {
                setCost(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={(event) =>
                      setSecheduleItemValue(
                        index,
                        "week_day",
                        event.target.value
                      )
                    }
                    options={[
                      { value: "0", label: "Domingo" },
                      { value: "1", label: "Segunda" },
                      { value: "2", label: "Terça" },
                      { value: "3", label: "Quarta" },
                      { value: "4", label: "Quinta" },
                      { value: "5", label: "Sexta" },
                      { value: "6", label: "Sábado" },
                    ]}
                  />
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(event) =>
                      setSecheduleItemValue(index, "from", event.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(event) =>
                      setSecheduleItemValue(index, "to", event.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
          </form>
        </main>
      </div>
    );
}

export default TeacherForm;